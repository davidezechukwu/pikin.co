import { Injector, Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';

import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import {GameService}   from '../../../DashboardModules/Game/Services/GameService.ng';

import {NumberSystemService}  from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import NumberSystemModel from '../../../DashboardModules/Game/Models/NumberSystemModel';

@Component({
    selector: 'PlayComponent',
    templateUrl: './PlayComponent.ng.html',
    styleUrls: ['./PlayComponent.scss']
})
export default class PlayComponent extends SuperComponent implements OnInit, DoCheck {
    @Output() OnGameChanged = new EventEmitter();
    protected IsPristinePickers: boolean = true;
    protected NumberSystem: NumberSystemModel;
    private _Game: GameModel;
    get Game(): GameModel {
        return this._Game;
    }
    set Game(game: GameModel) {
        this._Game = game;
        this.SessionService.Session.CurrentGame = this._Game;
        this.OnGameChanged.emit(this._Game);
    }
    protected PicksAsArray: string[];
    protected IsPickable: boolean[];
    protected IsPickSelected: boolean[];
    protected Numbers: string;
    protected NumbersAsArray: string[];
    protected LastClosingNumbers?: string;
    protected LastClosingNumbersAsArray?: string[];
    protected LastClosingDateUTC: Date;
    protected NextClosingDateUTC: Date;
    protected DrawClosingDateUTC: Date;
    protected RemainingHours: number;
    protected RemainingMinutes: number;
    protected RemainingSeconds: number;
    protected CurrentTime: Date = new Date();
    protected AsOf: string;
    

    constructor(
        protected Injector: Injector,
        protected GameService: GameService,
        protected NumberSystemService: NumberSystemService
    ) {
        super(Injector);
        let promises: Promise<any>[] = new Array<Promise<any>>();
        promises.push(this.NumberSystemService.GetLastClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetNextClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        promises.push(this.NumberSystemService.GetDrawClosingDateUTC(this.SessionService.Session.CurrentNumberSystem));
        Promise.all(promises).then((results: any[]) => {
            this.LastClosingDateUTC = results[0];
            this.NextClosingDateUTC = results[1];
            this.DrawClosingDateUTC = results[2];
        }).catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorPlayComponentInitFailed, this));

        this.PicksAsArray = new Array<string>(this.SessionService.GlobalProperties.MaxPickers);
        this.IsPickable = new Array<boolean>(this.SessionService.GlobalProperties.MaxPickers);
        this.IsPickSelected = new Array<boolean>(this.SessionService.GlobalProperties.MaxPickers);
        _.fill(this.PicksAsArray, '0');
        _.fill(this.IsPickable, true, 0, 8);
        _.fill(this.IsPickable, false, 7, this.SessionService.GlobalProperties.MaxPickers);
        _.fill(this.IsPickSelected, true, 0, 4);
        _.fill(this.IsPickSelected, false, 4, this.SessionService.GlobalProperties.MaxPickers);
    };

  
    public ngOnInit(): void {
        super.ngOnInit();
        if (this.SessionService.Session.CurrentGame && this.SessionService.Session.CurrentPickedNumbers) {
            var pickedNumbers: string = _.reverse(this.SessionService.Session.CurrentPickedNumbers.split('')).join('');
            for (var a = 0; a < this.SessionService.Session.CurrentPickedNumbers.length; a++) {
                this.PicksAsArray[a] = pickedNumbers[a];
            }
        } else {
            _.fill(this.PicksAsArray, '0');
        }
        this.Game = this.SessionService.Session.CurrentGame;
        this.NumberSystemService.GetNumberSystem(this.Game.NumberSystemID)
            .then(numberSystem => {
                this.NumberSystem = numberSystem;
                _.fill(this.IsPickable, true, 0, this.NumberSystem.NumberOfDigits);
                _.fill(this.IsPickable, false, this.NumberSystem.NumberOfDigits, this.SessionService.GlobalProperties.MaxPickers);
                _.fill(this.IsPickSelected, true, 0, this.Game.RequiredMatches);
                _.fill(this.IsPickSelected, false, this.Game.RequiredMatches, this.NumberSystem.NumberOfDigits);

                //this.NumberSystemService.GetLastClosingNumbers(this.NumberSystem)
                //    .then(numbers => {
                //        this.LastClosingNumbers = numbers;
                //        this.LastClosingNumbersAsArray = this.GetCurrentNumbersAsArrayReversed(this.LastClosingNumbers);
                //    })
                //    .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetLastClosingNumbersFailed, this));

                this.GetNumbers();

                let numberRefreshTimer = Observable.timer(this.SessionService.GlobalMockProperties.RefreshTimerRateStart, this.SessionService.GlobalMockProperties.NumbersRefreshTimerRateAdjuster);
                numberRefreshTimer.subscribe(t => {
                    this.GetNumbers();
                });

                let countDownEndTimer = Observable.timer(this.SessionService.GlobalMockProperties.RefreshTimerRateStart, this.SessionService.GlobalMockProperties.CountDownEndTimerRateAdjuster);
                countDownEndTimer.subscribe(t => {
                    this.NumberSystemService.GetRemainingTime(this.NumberSystem)
                        .then(remaingTime => {
                            this.RemainingHours = remaingTime.getHours();
                            this.RemainingMinutes = remaingTime.getMinutes();
                            this.RemainingSeconds = remaingTime.getSeconds();
                        })
                        .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetRemainingTimeFailed, this));
                });

                this.Refresh();
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGetNumberSystemFailed, this, this.Game.NumberSystemID.toString()));
    };

    public ngDoCheck(): void {
        super.ngDoCheck();
        this.Refresh();
    }

    protected OnBuyTicket(): void {
        if (!this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login/']);
            return;
        }

        var pickedNumbers: string = _.reverse(this.PicksAsArray.slice(0, this.Game.RequiredMatches)).join("");
        this.SessionService.Session.CurrentPickedNumbers = pickedNumbers;
        this.SessionService.Session.UseOncePage = "BuyTicketPage";
        this.Router.navigate(['/buyticket/', this.Game.ID, pickedNumbers,]);
    }

    protected OnSelectDraws(): void {
        if (!this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login/']);
            return;
        }

        var pickedNumbers: string = _.reverse(this.PicksAsArray.slice(0, this.Game.RequiredMatches)).join("");
        this.SessionService.Session.CurrentPickedNumbers = pickedNumbers;
        this.SessionService.Session.UseOncePage = "BuyTicketsPage";
        this.Router.navigate(['/buytickets/', this.Game.ID, pickedNumbers,]);
    }

    protected OnUp(index: string): void {
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
        this.PicksAsArray[index] = newValue;
    }

    protected OnDown(index: string): void {
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
        this.PicksAsArray[index] = newValue;
    }

    protected OnSelectRequiredMatches(numberOfMatches: number): void {
        //if (!this.IsPickable[index] === true) {
        //    me.Game = null;
        //}
        this.IsPickSelected[numberOfMatches - 1] = !this.IsPickSelected[numberOfMatches - 1];
        if (this.IsPickSelected[numberOfMatches - 1]) {
            _.fill(this.IsPickSelected, this.IsPickSelected[numberOfMatches - 1], 0, numberOfMatches);
        }
        else {
            numberOfMatches = numberOfMatches - 1;
        }
        _.fill(this.IsPickSelected, false, numberOfMatches, this.SessionService.GlobalProperties.MaxPickers);

        var me = this;
        me.GameService.GetGameWithRequiredMatches(this.NumberSystem.ID,  numberOfMatches)
            .then(game => me.Game = game)
            .catch(reason => {
                this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetGameWithRequiredMatchesFailed, me);
                me.Game = null;
            });
    }

  protected GetCurrentNumbersAsArray(numbers: string): string[] {
        return numbers.split("");
    }

    protected GetCurrentNumbersAsArrayReversed(numbers: string): string[] {
        return _.reverse(numbers.split(""));
    }

    private GetNumbers(): void {
        this.NumberSystemService.GetCurrentNumbers(this.NumberSystem)
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
        this.AsOf = this.Localise(this.LocalisationService.CaptionConstants.AsOf, null, this.GlobalisationService.FormatDate(this.CurrentTime));        
    }

}








