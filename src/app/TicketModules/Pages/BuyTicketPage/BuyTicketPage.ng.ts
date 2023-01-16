import { Component, Injector, Input, OnInit, DoCheck } from '@angular/core';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteParams } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';
import { State } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { NumberSystemService } from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import GameDrawModel from '../../../DashboardModules/Game/Models/GameDrawModel';
import { GameService } from '../../../DashboardModules/Game/Services/GameService.ng';
import PrizeModel from '../../../TicketModules/Models/PrizeModel';
import { TicketService } from '../../../TicketModules/Services/TicketService.ng';
import { FundingService } from '../../../DashboardModules/Funding/Services/FundingService.ng';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import  TicketOrderModel  from '../../../TicketModules/Models/TicketOrderModel';
import { TicketOrderStatusEnum } from '../../../TicketModules/Models/TicketOrderStatusEnum';

@Component({
    selector: 'BuyTicketPage',
    templateUrl: './BuyTicketPage.ng.html',
    styleUrls: ['./BuyTicketPage.scss'],
    animations: PageAnimations
})
export default class BuyTicketPage extends SuperPage implements OnInit, DoCheck {
    public State: State = {
        skip: 0,
        take: 5
    };
    protected TicketOrders: TicketOrderModel[];
    protected SelectedTicketOrder: TicketOrderModel;
    private _HasEnoughFunds: boolean;   
    public get HasEnoughFunds() {
        return this._HasEnoughFunds;
    }
    public set HasEnoughFunds(HasEnoughFunds: boolean) {
        this._HasEnoughFunds = HasEnoughFunds;
    }
    protected Balance: CurrencyAmountModel;
    protected RequiredAmount: CurrencyAmountModel;
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
    protected LastClosingNumbers: string;

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
    }

    public ngOnInit(): void {
        super.ngOnInit();        
        let promises: Promise<any>[] = new Array<Promise<any>>();
        promises.push(this.NumberSystemService.GetLastClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetNextClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetDrawClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetLastClosingNumbers(this.SessionService.Session.CurrentNumberSystem));

        Promise.all(promises)
            .then((results: any[]) => {
                this.LastClosingDateUTC = results[0];
                this.NextClosingDateUTC = results[1];
                this.DrawClosingDateUTC = results[2];
                this.LastClosingNumbers = results[3];
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorBuyTicketPageInitFailed, this));

        this.ActivatedRouteService.paramMap
            .switchMap((params: ActivatedRouteParams) => this.GameService.GetGame(params.get('gameID')))
            .subscribe((game: GameModel) => {                                
                this.Game = game;
                this.PickedNumbers = this.SessionService.Session.CurrentPickedNumbers;
                this.GameService.GetNextGameDraw(this.Game, new Date())
                    .then(gameDraw => {
                        //debugger;
                        var ticketOrder = new TicketOrderModel();
                        ticketOrder.GameID = this.Game.ID;
                        ticketOrder.GameDisplayName = this.Game.DisplayName;
                        ticketOrder.PickedNumbers = this.PickedNumbers;
                        ticketOrder.GamePrice = this.Game.Price;
                        ticketOrder.GameDrawDateUTC = this.NextClosingDateUTC;
                        ticketOrder.GameDrawID = gameDraw.ID;
                        ticketOrder.TicketOrderStatus = TicketOrderStatusEnum.Available;
                        ticketOrder.TicketOrderStatusDisplayName = TicketOrderStatusEnum[TicketOrderStatusEnum.Available].toString();
                        this.TicketOrders = [];
                        this.TicketOrders.push(ticketOrder);
                    })
                    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));


                this.TicketService.GetPrizes(this.Game)
                    .then(prizes => this.Prizes = prizes)
                    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGamePrizeListComponentInitFailed, this));

                this.AuthenticationService.GetAuthenticatedMember().then(member => {
                    if (member) {
                        this.FundingService.IsThereEnoughFunding(member, this.Game.Price)
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

    protected OnBuyTicket(): void {
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => {
                //debugger;                                
                this.GameService.GetNextGameDraw(this.Game, new Date())
                    .then(gameDraw => {
                        this.TicketService.BuyTicket(member, this.Game, gameDraw.Draw, gameDraw, this.PickedNumbers)
                            .then(ticket => this.Router.navigate(['/tickets/', ticket.ID.toString()]))
                            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
                    })
                    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));                                
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, this));
    }

    public OnSelect(ticketOrder: TicketOrderModel): void {
        this.SelectedTicketOrder = ticketOrder;        
    };

    public OnDataStateChange(dataStateChangeEvent: DataStateChangeEvent): void {
    }
}
