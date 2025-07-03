import { Injector, Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import { timer } from 'rxjs';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { GameService }   from '../../../DashboardModules/Game/Services/GameService.ng';
import { NumberSystemService }  from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import { NumberSystemModel } from '../../../DashboardModules/Game/Models/NumberSystemModel';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { TotalPayoutComponent } from '../TotalPayoutComponent/TotalPayoutComponent.ng';
import { GamePrizeListComponent } from '../../../DashboardModules/Game/Components/GamePrizeListComponent/GamePrizeListComponent.ng';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'PlayComponent',
    templateUrl: './PlayComponent.ng.html',
    styleUrls: ['./PlayComponent.scss'],
    imports: [SafePipe, TotalPayoutComponent, GamePrizeListComponent, CommonModule, FormsModule, ReactiveFormsModule  ],
})
export class PlayComponent extends SuperComponent implements OnInit, DoCheck {
    @Output() OnGameChanged = new EventEmitter();
    protected IsPristinePickers: boolean = true;
    protected NumberSystem: NumberSystemModel | null | undefined;
    private _Game: GameModel | null | undefined;
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
    

    constructor(
        injector: Injector,
        protected GameService: GameService,
        protected NumberSystemService: NumberSystemService
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

                //this.NumberSystemService.GetLastClosingNumbers(this.NumberSystem)
                //    .then(numbers => {
                //        this.LastClosingNumbers = numbers;
                //        this.LastClosingNumbersAsArray = this.GetCurrentNumbersAsArrayReversed(this.LastClosingNumbers);
                //    })
                //    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetLastClosingNumbersFailed, this));

                this.GetNumbers();

                let numberRefreshTimer = timer(this.SessionService.GlobalMockProperties.RefreshTimerRateStart, this.SessionService.GlobalMockProperties.NumbersRefreshTimerRateAdjuster);
                numberRefreshTimer.subscribe((t:any) => {
                    this.GetNumbers();
                });

                let countDownEndTimer = timer(this.SessionService.GlobalMockProperties.RefreshTimerRateStart, this.SessionService.GlobalMockProperties.CountDownEndTimerRateAdjuster);
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

    protected OnBuyTicket(): void {
        if (!this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login/']);
            return;
        }

        const pickedNumbers: string = this.PicksAsArray
            .slice(0, this.Game?.RequiredMatches)
            .reverse()
            .join('');

        this.SessionService.Session!.CurrentPickedNumbers = pickedNumbers;
        this.SessionService.Session!.UseOncePage = "BuyTicketPage";
        this.Router.navigate(['/buyticket/', this.Game?.ID, pickedNumbers,]);
    }

    protected OnSelectDraws(): void {
        if (!this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login/']);
            return;
        }

        const pickedNumbers: string = this.PicksAsArray
            .slice(0, this.Game?.RequiredMatches)
            .reverse()
            .join('');

        this.SessionService.Session!.CurrentPickedNumbers = pickedNumbers;
        this.SessionService.Session!.UseOncePage = "BuyTicketsPage";
        this.Router.navigate(['/buytickets/', this.Game?.ID, pickedNumbers,]);
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
        this.IsPickSelected[numberOfMatches - 1] = !this.IsPickSelected[numberOfMatches - 1];
        if (this.IsPickSelected[numberOfMatches - 1]) {
            this.IsPickSelected.fill(
                this.IsPickSelected[numberOfMatches - 1],
                0,
                numberOfMatches
            );
        } else {
            numberOfMatches = numberOfMatches - 1;
        }          

        var me = this;
        me.GameService.GetGameWithRequiredMatches(this.NumberSystem!.ID,  numberOfMatches)
            .then(game => me.Game = game)
            .catch(reason => {
                this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGameWithRequiredMatchesFailed, me);
                me.Game = new GameModel();
            });
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
