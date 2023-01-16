import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import NumberSystemModel from '../Models/NumberSystemModel';
import DrawModel from '../Models/DrawModel';
import DrawDaysOptions from '../Models/DrawDaysOptions';
import SourceModel from '../Models/SourceModel';
import NumberSystemSourceModel from '../Models/NumberSystemSourceModel';
import LocationModel from '../../../CommonModules/CoreModules/Models/LocationModel';
import { NumberSystemsMock } from '../_MockModules/NumberSystemModelMockDataBuilder';
import { SourcesMock } from '../_MockModules/SourceModelMockDataBuilder';
import { NumberSystemSourcesMock } from '../_MockModules/NumberSystemSourceModelMockDataBuilder';
import {SuperService}   from '../../../CommonModules/SuperModules/Services/SuperService.ng';
import { TradingDaysMock } from '../_MockModules/TradingDayModelMockDataBuilder';
import TradingDayModel from '../Models/TradingDayModel';
import { TradingDayStatusEnum } from '../Models/TradingDayStatusEnum';
import { DrawsMock } from '../_MockModules/DrawModelMockDataBuilder';

@Injectable()
export class NumberSystemService extends SuperService {
    protected NumberSystems: NumberSystemModel[] = NumberSystemsMock;

    constructor(protected Injector: Injector) {
        super(Injector);

    };

    public InitMockEnvironment() {
        var me = this;
        this.GetNumberSystem(this.SessionService.Session.CurrentNumberSystem.ID)
            .then(numberSystem => {
                let numberSystemDigitsSourceCount = numberSystem.Sources.length;
                let numbersRefreshTimer = Observable.timer(
                    this.SessionService.GlobalMockProperties.RefreshTimerRateStart,
                    this.SessionService.GlobalMockProperties.NumbersRefreshTimerRateAdjuster / numberSystemDigitsSourceCount
                );
                numbersRefreshTimer.subscribe(t => {
                    this.GetSourcesForNumberSystem(me.SessionService.Session.CurrentNumberSystem.ID)
                        .then(sources => {
                            for (let a = 0; a < sources.length; a++) {
                                this.GetSource(sources[a].ID)
                                    .then(source => {
                                        let value = Math.round(Math.random() * me.SessionService.GlobalMockProperties.TradeVolumeAdjuster);
                                        if (Math.random() >= me.SessionService.GlobalMockProperties.MarketSentimentAdjuster) {
                                            source.Numbers = (parseInt(source.Numbers) + value).toString();

                                        } else {
                                            source.Numbers = (parseInt(source.Numbers) - value).toString();
                                        }
                                    });
                            }
                        });
                });
            })        
    }

    protected GetNextWorkingDay(fromDate: Date, additionalDays: number) {
        // Get today's date and set new date based on parameter value
        var nextWorkingDay = fromDate;

        nextWorkingDay.setDate(nextWorkingDay.getDate() + additionalDays);

        // Sun, minus two days to get to Friday
        if (nextWorkingDay.getDay() == 0) {
            nextWorkingDay.setDate(nextWorkingDay.getDate() - 2);
        }

        // Sat, minus one day to get to Friday
        else if (nextWorkingDay.getDay() == 6) {
            nextWorkingDay.setDate(nextWorkingDay.getDate() - 1);
        }

        // Return required date string
        return nextWorkingDay;
    }

    protected ConstructNumber(numberSystem: NumberSystemModel, sourcesNumbers?: string[]): string {
        let numbers: string = "";
        if (numberSystem.Sources.length === 1) {
            let sourceNumbers = sourcesNumbers === undefined ? numberSystem.Sources[0].Numbers : sourcesNumbers[0];
            numbers = sourceNumbers;
        }
        else if (numberSystem.Sources.length > 1) {            
            for (let a = 0; a < numberSystem.Sources.length; a++) {
                let sourceNumbers = sourcesNumbers === undefined ? numberSystem.Sources[a].Numbers : sourcesNumbers[a];                
                sourceNumbers = _.reverse(sourceNumbers.split("")).join("");
                numbers = _.reverse(sourceNumbers.substring(numberSystem.Sources[a].FromDigit, numberSystem.Sources[a].ToDigit).split("")).join("") + numbers;
            };
        }
        else {
            throw Error("numberSystemSources can not be empty or undefined");
        }

        return numbers;
    }
    
    public GetDrawDayOptions(numberSystem: NumberSystemModel): DrawDaysOptions {
        var drawDaysOptions: DrawDaysOptions = new DrawDaysOptions();
        drawDaysOptions.IsAvailableOnSunday = numberSystem.IsAvailableOnSunday;
        drawDaysOptions.IsAvailableOnMonday = numberSystem.IsAvailableOnMonday;
        drawDaysOptions.IsAvailableOnTuesday = numberSystem.IsAvailableOnTuesday;
        drawDaysOptions.IsAvailableOnWednesday = numberSystem.IsAvailableOnWednesday;
        drawDaysOptions.IsAvailableOnThursday = numberSystem.IsAvailableOnThursday;
        drawDaysOptions.IsAvailableOnFriday = numberSystem.IsAvailableOnFriday;
        drawDaysOptions.IsAvailableOnSaturday = numberSystem.IsAvailableOnSaturday;

        drawDaysOptions.Sunday = drawDaysOptions.IsAvailableOnSunday;
        drawDaysOptions.Monday = drawDaysOptions.IsAvailableOnMonday;
        drawDaysOptions.Tuesday = drawDaysOptions.IsAvailableOnTuesday;
        drawDaysOptions.Wednesday = drawDaysOptions.IsAvailableOnWednesday;
        drawDaysOptions.Thursday = drawDaysOptions.IsAvailableOnThursday;
        drawDaysOptions.Friday = drawDaysOptions.IsAvailableOnFriday;
        drawDaysOptions.Saturday = drawDaysOptions.IsAvailableOnSaturday;

        return drawDaysOptions;
    }

    public GetNumberSystem(numberSystemID: number | string): Promise<NumberSystemModel> {
        //debugger;
        var me = this;
        return new Promise<NumberSystemModel>((resolve, reject) => {
            var numberSystem = _.find(NumberSystemsMock, numberSystem => { return numberSystem.ID == numberSystemID });
            this.GetSourcesForNumberSystem(numberSystem.ID)
                .then(sources => {
                    numberSystem.Sources = sources;
                    resolve(numberSystem);
                })
                .catch(reason => reject(reason));
        });
    }
    
    public GetSourcesForNumberSystem(numberSystemID: number | string): Promise<SourceModel[]> {
        //debugger;
        var me = this;
        return new Promise<SourceModel[]>((resolve, reject) => {            
            let numberSystemSources = _.filter(NumberSystemSourcesMock, numberSystemSource => { return numberSystemSource.NumberSystemID == numberSystemID; });
            let promises: Promise<any>[] = new Array<Promise<any>>();
            _.forEach(numberSystemSources, numberSystemSource => {promises.push(this.GetSource(numberSystemSource.SourceID))});                                    
            Promise.all(promises)
                .then((results: any[]) => {                    
                    resolve(results);
                })
                .catch(reason =>reject(reason));
        });        
    }

    public GetSource(sourceID: number | string): Promise<SourceModel> {
        return Promise.resolve(_.find(SourcesMock, digitsSource => { return digitsSource.ID == sourceID}));
    }
    
    public GetDraw(id: number | string): Promise<DrawModel> {
        return Promise.resolve(_.find(DrawsMock, draw => { return draw.ID == id; }));
    }
    
    public GetLastClosingNumbers(numberSystem: NumberSystemModel): Promise<string> {
        return Promise.resolve(this.SessionService.GlobalMockProperties.TempLastClosingNumber.toString());
    }
    
    public GetRemainingTime(numberSystem: NumberSystemModel): Promise<Date> {
        return Promise.resolve(new Date(this.SessionService.GlobalMockProperties.TempClosingDateUTC.getTime() - new Date().getTime()));
    }

    public GetLastClosingDateUTC(numberSystem: NumberSystemModel): Promise<Date> {
        return Promise.resolve(new Date());
    }

    public GetNextClosingDateUTC(numberSystem: NumberSystemModel): Promise<Date> {
        return Promise.resolve(this.GetNextWorkingDay(new Date(), 1));
    }

    public GetDrawClosingDateUTC(numberSystem: NumberSystemModel): Promise<Date> {
        return Promise.resolve(new Date(new Date().setHours(new Date().getHours() + 4)));
    }

    public GetDrawedNumbers(numberSystem: NumberSystemModel, drawDate: Date): Promise<string> {
        var me = this;
        return new Promise<string>((resolve, reject) => {
            let failed: boolean = false;
            let sourceClosingValues: string[] = new Array<string>(numberSystem.Sources.length);
            for (let sourceCount = 0; sourceCount < numberSystem.Sources.length; sourceCount++) {
                let source = numberSystem.Sources[sourceCount];
                let tradingDay = _.find(TradingDaysMock, _tradingDay => {
                    return (
                        _tradingDay.SourceID == source.ID &&
                        _tradingDay.CloseTimeUTC.getFullYear() == drawDate.getFullYear() &&
                        _tradingDay.CloseTimeUTC.getMonth() == drawDate.getMonth() &&
                        _tradingDay.CloseTimeUTC.getDate() == drawDate.getDate()
                        /*&&
                        _tradingDay.CloseTimeUTC.getHours() < drawDate.getHours() &&
                        _tradingDay.CloseTimeUTC.getMinutes() < drawDate.getMinutes()
                        */
                    );
                });

                if (tradingDay === undefined) {
                    failed = true;
                } else {
                    sourceClosingValues[sourceCount] = tradingDay.CloseValue;
                }
            }
            if (!failed) {
                let promises: Promise<any>[] = new Array<Promise<any>>();
                for (let a = 0; a < numberSystem.Sources.length; a++) {
                    promises.push(this.GetSource(numberSystem.Sources[a].ID));
                }
                let drawedNumbers: string;
                Promise.all(promises)
                    .then((sources: any[]) => {
                        drawedNumbers = this.ConstructNumber(numberSystem, sourceClosingValues);
                        resolve(drawedNumbers);
                    })
                    .catch(reason => { this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetSourceFailed, null); reject(reason) });
            }
        });
    }

    public GetCurrentNumbers(numberSystem: NumberSystemModel): Promise<string> {
        var me = this;
        return new Promise<string>((resolve, reject) => {
            let numbers: string = "";
            this.GetSourcesForNumberSystem(me.SessionService.Session.CurrentNumberSystem.ID)
                .then(sources => {
                    let promises: Promise<any>[] = new Array<Promise<any>>();
                    for (let a = 0; a < sources.length; a++) {
                        promises.push(this.GetSource(sources[a].ID));
                        Promise.all(promises)
                            .then((sources: any[]) => {
                                numbers = this.ConstructNumber(numberSystem);
                                resolve(numbers);
                            })
                            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetSourceFailed, null));
                    }
                })
        });
    }

}
