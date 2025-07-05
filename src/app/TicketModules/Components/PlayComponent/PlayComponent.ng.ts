import { Injector, Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import { timer } from 'rxjs';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { GameService }   from '../../../DashboardModules/Game/Services/GameService.ng';
import { NumberSystemService }  from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import { TicketService } from '../../../TicketModules/Services/TicketService.ng';
import { FundingService } from '../../../DashboardModules/Funding/Services/FundingService.ng';
import { NumberSystemModel } from '../../../DashboardModules/Game/Models/NumberSystemModel';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { TotalPayoutComponent } from '../TotalPayoutComponent/TotalPayoutComponent.ng';
import { GamePrizeListComponent } from '../../../DashboardModules/Game/Components/GamePrizeListComponent/GamePrizeListComponent.ng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrawDaysOptions } from '../../../DashboardModules/Game/Models/DrawDaysOptions';
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'PlayComponent',
    templateUrl: './PlayComponent.ng.html',
    styleUrls: ['./PlayComponent.scss'],
    imports: [SafePipe, TotalPayoutComponent, GamePrizeListComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PlayComponent extends SuperComponent implements OnInit, DoCheck {
    @Output() OnGameChanged = new EventEmitter();
    protected IsPristinePickers: boolean = true;
    protected NumberSystem: NumberSystemModel | null | undefined;
    private _Game: GameModel | null | undefined;
    protected Winner: boolean = false
    get Game(): GameModel | null | undefined {
        return this._Game;
    }
    set Game(game: GameModel) {
        this._Game = game;
        this.SessionService.Session!.CurrentGame = this._Game;
        this.OnGameChanged.emit(this._Game);
    }
    protected PicksAsArray: string[];
    protected IsPickable: boolean[];    
    protected IsPickSelected: boolean[];
    protected Numbers: string = '';
    protected NumbersAsArray: string[] = [];
    protected LastClosingNumbers?: string;
    protected LastClosingNumbersAsArray?: string[];
    protected LastClosingDateUTC: Date | null | undefined;
    protected NextClosingDateUTC: Date | null | undefined;
    protected DrawClosingDateUTC: Date | null | undefined;
    protected RemainingHours: number = 0;
    protected RemainingMinutes: number = 0;
    protected RemainingSeconds: number = 0;
    protected CurrentTime: Date = new Date();
    protected AsOf: string = '';    

    protected TotalWinningTickets: number = 0;

    constructor(
        injector: Injector,
        protected GameService: GameService,
        protected NumberSystemService: NumberSystemService,
        protected TicketService: TicketService,        
        protected FundingService: FundingService,
        protected ToastrService: ToastrService
    ) {
        super(injector);
        let promises: Promise<any>[] = new Array<Promise<any>>();
        promises.push(this.NumberSystemService.GetLastClosingDateUTC(this.SessionService.Session?.CurrentNumberSystem!));
        promises.push(this.NumberSystemService.GetNextClosingDateUTC(this.SessionService.Session?.CurrentNumberSystem!));
        promises.push(this.NumberSystemService.GetDrawClosingDateUTC(this.SessionService.Session?.CurrentNumberSystem!));
        Promise.all(promises).then((results: any[]) => {
            this.LastClosingDateUTC = results[0];
            this.NextClosingDateUTC = results[1];
            this.DrawClosingDateUTC = results[2];
        }).catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorPlayComponentInitFailed, this));

        this.PicksAsArray = new Array<string>(this.SessionService.GlobalProperties.MaxPickers);
        this.IsPickable = new Array<boolean>(this.SessionService.GlobalProperties.MaxPickers);        
        this.IsPickSelected = new Array<boolean>(this.SessionService.GlobalProperties.MaxPickers);
        this.PicksAsArray.fill('0');
        this.IsPickable.fill(true, 0, 8);
        this.IsPickable.fill(false,7,this.SessionService.GlobalProperties.MaxPickers);        
        this.IsPickSelected.fill(true, 0, 4);
        this.IsPickSelected.fill(false, 4,this.SessionService.GlobalProperties.MaxPickers);
    };

    public override ngOnInit(): void {
        super.ngOnInit();
        if (this.SessionService.Session?.CurrentGame && this.SessionService.Session?.CurrentPickedNumbers) {
            const pickedNumbers: string = this.SessionService.Session?.CurrentPickedNumbers
                .split('')
                .reverse()
                .join('');

            for (var a = 0; a < this.SessionService.Session!.CurrentPickedNumbers.length; a++) {
                this.PicksAsArray[a] = pickedNumbers[a];
            }
        } else {
            this.PicksAsArray.fill('0');
        }
        this.Game = this.SessionService.Session?.CurrentGame!;
        this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID!)
            .then(numberSystem => {
                this.NumberSystem = numberSystem;                         
                this.IsPickable.fill(true, 0, this.NumberSystem.NumberOfDigits);                
                this.IsPickable.fill(
                    false,
                    this.NumberSystem.NumberOfDigits,
                    this.SessionService.GlobalProperties.MaxPickers
                );
                this.IsPickSelected.fill(true, 0, this.Game?.RequiredMatches);
                this.IsPickSelected.fill(
                    false,
                    this.Game?.RequiredMatches,
                    this.NumberSystem.NumberOfDigits
                );

                this.GetNumbers();

                let numberRefreshTimer = timer(0, 1000);
                numberRefreshTimer.subscribe((t:any) => {
                    this.GetNumbers();
                });

                let countDownEndTimer = timer(0, 1000);
                countDownEndTimer.subscribe((t: any) => {
                    this.NumberSystemService.GetRemainingTime(this.NumberSystem!)
                        .then(remaingTime => {
                            this.RemainingHours = remaingTime.getHours();
                            this.RemainingMinutes = remaingTime.getMinutes();
                            this.RemainingSeconds = remaingTime.getSeconds();
                        })
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetRemainingTimeFailed, this));
                });

                this.Refresh();
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetNumberSystemFailed, this, this.Game!.NumberSystemID!.toString()));        
    };

    public override  ngDoCheck(): void {
        super.ngDoCheck();
        this.Refresh();
    }

    protected OnUp(index: number): void {
        if (!this.IsPickable[index]) {
            return;
        }
        if (!this.IsPickSelected[index]) {
            return;
        }
        this.IsPristinePickers = false;
        let newValue: number = parseInt(this.PicksAsArray[index]);
        if (newValue < 9) {
            ++newValue;
        }
        else {
            newValue = 0;
        }
        this.PicksAsArray[index] = newValue.toString();
    }

    protected OnDown(index: number): void {
        if (!this.IsPickable[index]) {
            return;
        }
        if (!this.IsPickSelected[index]) {
            return;
        }
        this.IsPristinePickers = false;
        let newValue: number = parseInt(this.PicksAsArray[index]);
        if (newValue > 0) {
            --newValue;
        }
        else {
            newValue = 9;
        }
        this.PicksAsArray[index] = newValue.toString();;
    }

    protected OnSelectRequiredMatches(numberOfMatches: number): void {         
        if (this.IsPickSelected[numberOfMatches - 1]){
            this.PicksAsArray[numberOfMatches - 1] = '';
        }else{
            this.PicksAsArray[numberOfMatches - 1] = '0';     
            for (let c = ( numberOfMatches - 1); c > 0; c-- ){
                if ( this.PicksAsArray[c] == ''){
                    this.PicksAsArray[c] = '0'
                }
            }       
        }
        this.IsPickSelected[numberOfMatches - 1] = !this.IsPickSelected[numberOfMatches - 1];
        if (this.IsPickSelected[numberOfMatches - 1]) {
            this.IsPickSelected.fill(this.IsPickSelected[numberOfMatches - 1],0,numberOfMatches );
        } else {
            numberOfMatches = numberOfMatches - 1;
        }          
        
        this.GameService.GetGameWithRequiredMatches(this.NumberSystem!.ID,  numberOfMatches)
            .then(game => {                
                this.Game = game;
                this.IsPickSelected.fill(false, numberOfMatches + 1);
                 this.PicksAsArray.fill('',  numberOfMatches + 1);
            })
            .catch(reason => {
                this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGameWithRequiredMatchesFailed, this);
                this.Game = new GameModel();
            });
    }

    protected OnBuyTicket(): void {        
        if (!this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login/']);
            return;
        }        
        let pickededNumbers: string = this.PicksAsArray.slice(0, this.Game?.RequiredMatches).reverse().join('');        
        this.SessionService.Session!.CurrentPickedNumbers = pickededNumbers;
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => {
                var ticketOrders = [];
                var totalPrice;
                var winningPot: CurrencyAmountModel | undefined | null;
                const drawDays: DrawDaysOptions = new DrawDaysOptions();
                drawDays.Monday = true;
                drawDays.IsAvailableOnMonday = true;
                this.GameService.GeTicketOrders(this.Game!, new Date(), pickededNumbers, drawDays, 0)
                    .then(ticketOrders => {
                        ticketOrders = ticketOrders;
                        totalPrice = new CurrencyAmountModel(this.Game!.Price!.Amount, this.Game!.Price!.Currency);
                        totalPrice.Amount = this.Game!.Price!.Amount * ticketOrders.length;
                        winningPot = this.TicketService.GetWinningPrice(this.Game?.Name!, pickededNumbers.length );    
                        this.AuthenticationService.GetAuthenticatedMember().then(member => {
                            if (member) {
                                this.FundingService.IsThereEnoughFunding(member, totalPrice!)
                                    .then((fundingCheckBalanceResult: any) => {
                                        if ( fundingCheckBalanceResult.HasEnoughFunding)
                                        {
                                            ticketOrders.forEach(ticketOrder => {
                                                this.TicketService.BuyTicket(member!, ticketOrder.Game!, ticketOrder.GameDraw!.Draw, ticketOrder.GameDraw!, pickededNumbers)
                                                    .catch((reason: any) => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
                                            });                                        
                                            let drawnNumbers: string = this.NumbersAsArray.join('');
                                            drawnNumbers = drawnNumbers.substring((9 - this.Game?.RequiredMatches!) + 1, 10);
                                            this.Winner = drawnNumbers == pickededNumbers;
                                            if (this.Winner) {
                                                if (this.Winner) {
                                                    this.FundingService.AddFunding(member, winningPot!)
                                                    this.TicketService.AddWinner(winningPot!)
                                                    setTimeout(() => {
                                                        const container = document.getElementById('bubble-celebration');
                                                        if (!container) return;
                                                        for (let i = 0; i < 15; i++) {
                                                            const bubble = document.createElement('div');
                                                            bubble.classList.add('bubble');
                                                            const size = 100 + Math.random() * 80;
                                                            bubble.style.width = `${size}px`;
                                                            bubble.style.height = `${size}px`;
                                                            bubble.style.left = `${Math.random() * 100}%`;
                                                            bubble.style.animationDuration = `${6 + Math.random() * 4}s`;
                                                            bubble.style.background = `radial-gradient(circle at 30% 30%, white, transparent),
                                                                                        radial-gradient(circle at 70% 70%, hsl(${Math.random() * 360}, 80%, 60%), rgba(0, 0, 0, 0.2))`;

                                                            container.appendChild(bubble);

                                                            setTimeout(() => bubble.remove(), 10000);
                                                        }
                                                    }, 50); // A short delay to let Angular render the bubble container
                                                }
                                            } else {
                                                const toast = `${pickededNumbers} did not match the drawn numbers ${drawnNumbers}`;
                                                this.ToastrService.success(toast, 'You almost got it. Try again and better luck next time'); 
                                            }
                                        }else{
                                            const toast = `You did not have enough funds to play the game, add more funds or play a lesser game`;
                                            this.ToastrService.error(toast, 'Not enough funds');
                                        }
                                    })
                                    .catch((reason: any) => {
                                        const toast = `You did not have enough funds to play the game, add more funds or play a lesser game`;
                                        this.ToastrService.error(toast, 'Not enough funds');
                                        this.Router.navigate(['/funding/Addfunds']);
                                    });
                            }
                        })
                            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));

                    })
                    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));
    }

    protected OnClearGame(): void {
        if (!this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login/']);
            return;
        }
        this.PicksAsArray.fill('0', 0);
    }

    protected OnAdjustSpeed(): void{
        this.Router.navigate(['/dashboard/numbersystem/change']);
        return;
    }

    protected GetCurrentNumbersAsArray(numbers: string): string[] {
        return numbers.split("");
    }

    protected GetCurrentNumbersAsArrayReversed(numbers: string): string[] {
        return numbers.split("").reverse();
    }

    private GetNumbers(): void {
        this.NumberSystemService.GetCurrentNumbers(this.NumberSystem!)
            .then(numbers => {
                this.Numbers = numbers;
                this.NumbersAsArray = this.GetCurrentNumbersAsArray(this.Numbers);
                if (this.Numbers !== "0123456789" && this.LastClosingNumbers == undefined) {
                    this.LastClosingNumbers = this.Numbers;
                    this.LastClosingNumbersAsArray = this.GetCurrentNumbersAsArray(this.LastClosingNumbers);
                }
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetCurrentNumbersFailed, this));
    }

    private Refresh(): void {
        this.CurrentTime = new Date();
        this.AsOf = this.Localise(this.LocalisationService.CaptionConstants.AsOf, '', this.GlobalisationService.FormatDate(this.CurrentTime));        
    }
}
