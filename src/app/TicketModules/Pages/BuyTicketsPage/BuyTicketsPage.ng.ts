import { Component, Injector, Input, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { Observable, Observer } from 'rxjs/Rx';
import { ActivatedRouteParams } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import * as $ from 'jquery';
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';
import { State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { NumberSystemService } from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import GameDrawModel from '../../../DashboardModules/Game/Models/GameDrawModel';
import { GameService } from '../../../DashboardModules/Game/Services/GameService.ng';
import DrawDaysOptions from '../../../DashboardModules/Game/Models/DrawDaysOptions';
import PrizeModel from '../../../TicketModules/Models/PrizeModel';
import { TicketService } from '../../../TicketModules/Services/TicketService.ng';
import TicketOrderModel from '../../../TicketModules/Models/TicketOrderModel';
import { TicketOrderStatusEnum } from '../../../TicketModules/Models/TicketOrderStatusEnum';
import { FundingService } from '../../../DashboardModules/Funding/Services/FundingService.ng';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';



@Component({
    selector: 'BuyTicketsPage',
    templateUrl: './BuyTicketsPage.ng.html',
    styleUrls: ['./BuyTicketsPage.scss'],
    animations: PageAnimations
})
export default class BuyTicketsPage extends SuperPage implements OnInit, DoCheck {    
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
    protected TicketOrders: TicketOrderModel[];
    protected SelectedTicketOrder: TicketOrderModel;
    protected DrawDaysOptions: DrawDaysOptions;
    protected Weeks: number[] = [];
    protected SelectedWeek: number = 1;
    private _HasEnoughFunds: boolean;
    public get HasEnoughFunds() {
        return this._HasEnoughFunds;
    }
    public set HasEnoughFunds(HasEnoughFunds: boolean) {
        this._HasEnoughFunds = HasEnoughFunds;
    }
    protected Balance: CurrencyAmountModel;
    protected RequiredAmount: CurrencyAmountModel;
    protected TotalPrice: CurrencyAmountModel;
    protected RemainingHours: number;
    protected RemainingMinutes: number;
    protected RemainingSeconds: number;
    protected Numbers: string;
    protected Game: GameModel;
    protected Prizes: PrizeModel[];
    protected PickedNumbers: string;
    protected CurrentTime: Date = new Date();
    protected LastClosingDateUTC: Date;
    protected NextClosingDateUTC: Date;
    protected DrawClosingDateUTC: Date;
    protected LastClosingNumbers: string

    public constructor(
        protected Injector: Injector,
        protected GameService: GameService,
        protected TicketService: TicketService,
        protected NumberSystemService: NumberSystemService,
        protected FundingService: FundingService        
    ) {
        super(Injector);
        this.PageIsAUseOncePostOnlyPage = true;
        this.PageIsAUseOncePostOnlyPageProviderData = ['/play'];
        for (var week = 1; week < 53; week++) {
            this.Weeks.push(week);
        }
    }

    public ngOnInit(): void {
        super.ngOnInit();
        let promises: Promise<any>[] = new Array<Promise<any>>();
        promises.push(this.NumberSystemService.GetLastClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetLastClosingNumbers(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetNextClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetDrawClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));

        Promise.all(promises)
            .then((results: any[]) => {
                var index = 0;
                this.LastClosingDateUTC = results[index++];
                this.LastClosingNumbers = results[index++];
                this.NextClosingDateUTC = results[index++];
                this.DrawClosingDateUTC = results[index++];
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorBuyTicketsPageInitFailed, this));

        let inc = 1;
        this.ActivatedRouteService.paramMap
            .switchMap((params: ActivatedRouteParams) => this.GameService.GetGame(params.get('gameID')))
            .subscribe((game: GameModel) => {
                this.Game = game;
                this.PickedNumbers = this.SessionService.Session.CurrentPickedNumbers;

                this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID)
                    .then(numberSystem => {
                        this.Game.NumberSystem = numberSystem;
                        this.DrawDaysOptions = this.NumberSystemService.GetDrawDayOptions(numberSystem);
                        this.OnUpdateDraws();
                    })
                    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetNumberSystemFailed, this, this.Game.NumberSystemID.toString()));

                //this.AuthenticationService.GetAuthenticatedMember().then(member => {
                //    if (member) {
                //        this.FundingService.IsThereEnoughFunding(member, this.Game.Price)
                //            .then(fundingCheckBalanceResult => {
                //                this.HasEnoughFunds = fundingCheckBalanceResult.HasEnoughFunding;
                //                this.Balance = fundingCheckBalanceResult.Balance;
                //                this.RequiredAmount = fundingCheckBalanceResult.RequiredAmount;
                //            })
                //            .catch(reason => {
                //                this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorIsThereEnoughFundingFailed, this);
                //                this.HasEnoughFunds = false;
                //            });
                //    }
                //})
                //    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));
            });

        let numberRefreshTimer = Observable.timer(this.SessionService.GlobalMockProperties.RefreshTimerRateStart, this.SessionService.GlobalMockProperties.NumbersRefreshTimerRateAdjuster);
        numberRefreshTimer.subscribe(t => {
            this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID)
                .then(numberSystem => {
                    this.NumberSystemService.GetCurrentNumbers(numberSystem)
                        .then(numbers => this.Numbers = numbers)
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetCurrentNumbersFailed, this));
                })
                .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetNumberSystemFailed, this, this.Game.NumberSystemID.toString()));
        });

        let countDownEndTimer = Observable.timer(this.SessionService.GlobalMockProperties.RefreshTimerRateStart, this.SessionService.GlobalMockProperties.CountDownEndTimerRateAdjuster);
        countDownEndTimer.subscribe(t => {
            this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID)
                .then(numberSystem => {
                    //this.Game.NumberSystem = numberSystem;
                    this.NumberSystemService.GetRemainingTime(numberSystem)
                        .then(remaingTime => {
                            this.RemainingHours = remaingTime.getHours();
                            this.RemainingMinutes = remaingTime.getMinutes();
                            this.RemainingSeconds = remaingTime.getSeconds();
                        })
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetRemainingTimeFailed, this));
                })
                .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetNumberSystemFailed, this, this.Game.NumberSystemID.toString()));
        });
    }

    public ngDoCheck(): void {
        super.ngDoCheck();
        this.CurrentTime = new Date();
    }
    
    public OnDataStateChange(dataStateChangeEvent: DataStateChangeEvent) {
        this.State = $.extend({}, this.State, dataStateChangeEvent);
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
                //debugger;                                
                this.TicketOrders = [];
                this.GameService.GeTicketOrders(this.Game, new Date(), this.PickedNumbers, this.DrawDaysOptions, this.SelectedWeek)
                    .then(ticketOrders => {
                        //debugger;
                        this.TicketOrders = ticketOrders;
                        this.TotalPrice = new CurrencyAmountModel(this.Game.Price.Amount, this.Game.Price.Currency);
                        this.TotalPrice.Amount = this.Game.Price.Amount * ticketOrders.length;


                        this.AuthenticationService.GetAuthenticatedMember().then(member => {
                            if (member) {
                                this.FundingService.IsThereEnoughFunding(member, this.TotalPrice)
                                    .then(fundingCheckBalanceResult => {
                                        this.HasEnoughFunds = fundingCheckBalanceResult.HasEnoughFunding;
                                        this.Balance = fundingCheckBalanceResult.Balance;
                                        this.RequiredAmount = fundingCheckBalanceResult.RequiredAmount;
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
                //debugger;                                
                _.forEach(this.TicketOrders, ticketOrder => {
                    this.TicketService.BuyTicket(member, ticketOrder.Game, ticketOrder.GameDraw.Draw, ticketOrder.GameDraw, this.PickedNumbers)
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
                });
                this.Router.navigate(['/tickets']);
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));
    }
}
