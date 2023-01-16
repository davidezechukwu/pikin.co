import * as _ from 'lodash';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrenciesMock } from '../../../CommonModules/CoreModules/_MockModules/CurrencyModelMockDataBuilder';
import CurrencyModel from '../../../CommonModules/CoreModules/Models/CurrencyModel';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import { NumberSystemsMock } from './NumberSystemModelMockDataBuilder';
import {NumberSystemService}  from '../Services/NumberSystemService.ng';
import DrawModel from '../Models/DrawModel';
import { DrawStatusEnum } from '../Models/DrawStatusEnum';
import NumberSystemModel from '../Models/NumberSystemModel';
import { TradingDayEnum } from '../Models/TradingDayEnum';
import SourceModel from '../Models/SourceModel';
import TradingDayModel from '../Models/TradingDayModel';
import { TradingDayStatusEnum } from '../Models/TradingDayStatusEnum';


export default class TradingDayModelMockDataBuilder extends SuperModelMockDataBuilder {
    constructor() {
        super();
    }

    public BuildTradingDaysMocks(sources: SourceModel[]): TradingDayModel[] {
        //debugger;                
        _.forEach(sources, source => {            
            let past = new Date(new Date().setDate(-30));
            //let future = new Date(new Date().setDate(30));            
            var days = 30

            for (let day = 0; day < days; day++) {
                let isATradingDay = false;
                let drawTime: Date = null;
                let tradingDate = past;                
                tradingDate = new Date(tradingDate.setDate(tradingDate.getDate() + 1));

                if (tradingDate.getDay() == TradingDayEnum.Sunday && source.IsAvailableOnSunday) {
                    isATradingDay = true;
                    drawTime = source.SundayEndTimeUTC;
                }
                else if (tradingDate.getDay() == TradingDayEnum.Monday && source.IsAvailableOnMonday) {
                    isATradingDay = true;
                    drawTime = source.MondayEndTimeUTC;
                }
                else if (tradingDate.getDay() == TradingDayEnum.Tuesday && source.IsAvailableOnTuesday) {
                    isATradingDay = true;
                    drawTime = source.TuesdayEndTimeUTC;
                }
                else if (tradingDate.getDay() == TradingDayEnum.Wednesday && source.IsAvailableOnWednesday) {
                    isATradingDay = true;
                    drawTime = source.WednesdayEndTimeUTC;
                }
                else if (tradingDate.getDay() == TradingDayEnum.Thursday && source.IsAvailableOnThursday) {
                    isATradingDay = true;
                    drawTime = source.ThursdayEndTimeUTC;
                }
                else if (tradingDate.getDay() == TradingDayEnum.Friday && source.IsAvailableOnFriday) {
                    isATradingDay = true;
                    drawTime = source.FridayEndTimeUTC;
                }
                else if (tradingDate.getDay() == TradingDayEnum.Saturday && source.IsAvailableOnSaturday) {
                    isATradingDay = true;
                    drawTime = source.SaturdayEndTimeUTC;
                }

                if (isATradingDay) {
                    var tradingDay = new TradingDayModel();                    
                    tradingDay.ID = this.GetNextID();
                    tradingDay.SourceID = source.ID;                                        
                    tradingDay.CloseValue = Math.round(Math.random() * 10000000).toString();                                        
                    tradingDay.CloseTimeUTC = new Date(tradingDate.getFullYear(), tradingDate.getMonth(), tradingDate.getDate(), drawTime.getHours(), drawTime.getMinutes(), drawTime.getSeconds()); ;
                    tradingDay.TradingDayStatus = TradingDayStatusEnum.Open;                                        
                    TradingDaysMock.push(tradingDay);               
                }
            }
        });

        return TradingDaysMock;
    }
}

export var TradingDaysMock: TradingDayModel[] = [];