import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Injector,  OnInit, DoCheck } from '@angular/core';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { from, forkJoin, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { NumberSystemService } from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { GameService } from '../../../DashboardModules/Game/Services/GameService.ng';
import { DrawDaysOptions } from '../../../DashboardModules/Game/Models/DrawDaysOptions';
import { PrizeModel } from '../../../TicketModules/Models/PrizeModel';
import { TicketService } from '../../../TicketModules/Services/TicketService.ng';
import { TicketOrderModel } from '../../../TicketModules/Models/TicketOrderModel';
import { FundingService } from '../../../DashboardModules/Funding/Services/FundingService.ng';
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'BuyTicketsPage',
    templateUrl: 'BuyTicketsPage.ng.html',
    styleUrls: ['BuyTicketsPage.scss'],
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, SafePipe, GridModule, FormsModule, CommonModule]
})
export class BuyTicketsPage extends SuperPage implements OnInit, DoCheck {    
    protected State: State = {        
        skip: 0,        
        take: 5,
        sort: [],        
        filter: {
          logic: "and",
          filters: []
        },
        group: []     
    };
    protected StateOptions = {        
        sortable:{                         
                  allowUnsort: 'allowUnsort',
                  mode: 'multiple'
        },
        filterable:false,
        pageSize:5,
        pageable:{
                    buttonCount: this.State.take,
                    info: false,
                    type: 'numeric',
                    pageSizes: [5,10,20,30,90,180,365],
                    previousNext: true
        },
        scrollable: "none"
    };    
    protected TicketOrders: TicketOrderModel[] = [];
    protected SelectedTicketOrder: TicketOrderModel = new TicketOrderModel();
    protected DrawDaysOptions: DrawDaysOptions = new DrawDaysOptions();
    protected Weeks: number[] = [];
    protected SelectedWeek: number = 1;
    private _HasEnoughFunds: boolean = true;
    public get HasEnoughFunds() {
        return this._HasEnoughFunds;
    }
    public set HasEnoughFunds(HasEnoughFunds: boolean) {
        this._HasEnoughFunds = HasEnoughFunds;
    }
    protected Balance: CurrencyAmountModel | null |undefined;
    protected RequiredAmount: CurrencyAmountModel | null | undefined;
    protected TotalPrice: CurrencyAmountModel | null | undefined;
    protected RemainingHours: number = 24;
    protected RemainingMinutes: number  = 60;
    protected RemainingSeconds: number  = 60;
    protected Numbers: string   = '';
    protected Game: GameModel = new GameModel();
    protected Prizes: PrizeModel[] = [];
    protected PickedNumbers: string = '';
    protected CurrentTime: Date = new Date();
    protected LastClosingDateUTC: Date | null | undefined;
    protected NextClosingDateUTC: Date | null | undefined;
    protected DrawClosingDateUTC: Date | null | undefined;
    protected LastClosingNumbers: string = '';    
    
    public constructor(
        injector: Injector,
        protected GameService: GameService,
        protected TicketService: TicketService,
        protected NumberSystemService: NumberSystemService,
        protected FundingService: FundingService,
        protected Route: ActivatedRoute
    ) {
        super(injector);
        this.PageIsAUseOncePostOnlyPage = true;
        this.PageIsAUseOncePostOnlyPageProviderData = ['/play'];
        for (var week = 1; week < 53; week++) {
            this.Weeks.push(week);
        }
    }

    public override ngOnInit(): void {
        super.ngOnInit();

        // 1) Load all four closing values in parallel:
        forkJoin({
            lastDate: from(this.NumberSystemService.GetLastClosingDateUTC(this.SessionService.Session?.CurrentNumberSystem!)),
            lastNums: from(this.NumberSystemService.GetLastClosingNumbers(this.SessionService.Session?.CurrentNumberSystem!)),
            nextDate: from(this.NumberSystemService.GetNextClosingDateUTC(this.SessionService.Session?.CurrentNumberSystem!)),
            drawDate: from(this.NumberSystemService.GetDrawClosingDateUTC(this.SessionService.Session?.CurrentNumberSystem!))
        }).subscribe({
            next: ({ lastDate, lastNums, nextDate, drawDate }) => {
                this.LastClosingDateUTC = lastDate;
                this.LastClosingNumbers = lastNums;
                this.NextClosingDateUTC = nextDate;
                this.DrawClosingDateUTC = drawDate;
            },
            error: err => {throw new Error(err)}
        });

        // 2) On route change, load game → number system → setup draws
        this.Route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                from(this.GameService.GetGame(params.get('gameID')!))
            ),
            tap((game: GameModel) => {
                this.Game = game;
                this.PickedNumbers = this.SessionService.Session?.CurrentPickedNumbers!;
            }),
            switchMap((game: GameModel) =>
                from(this.NumberSystemService.GetNumberSystem(game.NumberSystemID!)).pipe(
                    tap(ns => {
                        this.Game.NumberSystem = ns;
                        this.DrawDaysOptions = this.NumberSystemService.GetDrawDayOptions(ns);
                        this.OnUpdateDraws();
                    })
                )
            )
        ).subscribe({
            error: err => { throw new Error(err) }
        });

        // 3) Periodically refresh CurrentNumbers
        timer(0, 1000).pipe(
            switchMap(() =>
                from(this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID!))
            ),
            switchMap(ns =>
                from(this.NumberSystemService.GetCurrentNumbers(ns))
            )
        ).subscribe({
            next: nums => this.Numbers = nums,
            error: err => { throw new Error(err) }
        });

        // 4) Periodically refresh remaining time countdown
        timer(0, 1000).pipe(
            switchMap(() =>
                from(this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID!))
            ),
            switchMap(ns =>
                from(this.NumberSystemService.GetRemainingTime(ns))
            )
        ).subscribe({
            next: rt => {
                this.RemainingHours = rt.getHours();
                this.RemainingMinutes = rt.getMinutes();
                this.RemainingSeconds = rt.getSeconds();
            },
            error: err => { throw new Error(err) }
        });
    }

    public override ngDoCheck(): void {
        super.ngDoCheck();
        this.CurrentTime = new Date();
    }
    
    public OnDataStateChange(dataStateChangeEvent: DataStateChangeEvent) {
        this.State = {
            ...this.State,
            ...dataStateChangeEvent
          };
    }

    public OnSelectDrawOptions(event: any): void {
        this.OnUpdateDraws();
    }

    public OnSelectDrawWeeks(event: any): void {
        this.OnUpdateDraws();
    }

    protected OnUpdateDraws(): void {
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => {                
                this.TicketOrders = [];
                this.GameService.GeTicketOrders(this.Game, new Date(), this.PickedNumbers, this.DrawDaysOptions, this.SelectedWeek)
                    .then(ticketOrders => {                        
                        this.TicketOrders = ticketOrders;
                        this.TotalPrice = new CurrencyAmountModel(this.Game.Price!.Amount, this.Game.Price!.Currency);
                        this.TotalPrice.Amount = this.Game.Price!.Amount * ticketOrders.length;


                        this.AuthenticationService.GetAuthenticatedMember().then(member => {
                            if (member) {
                                this.FundingService.IsThereEnoughFunding(member, this.TotalPrice!)
                                    .then(fundingCheckBalanceResult => {
                                        this.HasEnoughFunds = fundingCheckBalanceResult.HasEnoughFunding;
                                        this.Balance = fundingCheckBalanceResult.Balance!;
                                        this.RequiredAmount = fundingCheckBalanceResult.RequiredAmount!;
                                    })
                                    .catch(reason => {
                                        this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorIsThereEnoughFundingFailed, this);
                                        this.HasEnoughFunds = false;
                                    });
                            }
                        })
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));

                    })
                    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));
    }

    public OnBuyTickets(): void {
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => {            
                this.TicketOrders.forEach(ticketOrder => {
                    this.TicketService.BuyTicket(member!, ticketOrder.Game!, ticketOrder.GameDraw!.Draw, ticketOrder.GameDraw!, this.PickedNumbers)
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
                });
                this.Router.navigate(['/tickets']);
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));
    }
}
