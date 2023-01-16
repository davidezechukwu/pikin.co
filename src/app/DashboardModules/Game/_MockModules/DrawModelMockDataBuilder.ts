import * as _ from 'lodash';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrenciesMock } from '../../../CommonModules/CoreModules/_MockModules/CurrencyModelMockDataBuilder';
import CurrencyModel from '../../../CommonModules/CoreModules/Models/CurrencyModel';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import { NumberSystemsMock } from './NumberSystemModelMockDataBuilder';
import { NumberSystemService } from '../Services/NumberSystemService.ng';
import NumberSystemModel from '../Models/NumberSystemModel';
import { TradingDayEnum } from '../Models/TradingDayEnum';
import DrawModel from '../Models/DrawModel';
import { DrawStatusEnum } from '../Models/DrawStatusEnum';

export default class DrawModelMockDataBuilder extends SuperModelMockDataBuilder {
    constructor() {
        super();
    }

    public BuildDrawMocks(numberSystems: NumberSystemModel[], numberSystemService: NumberSystemService): DrawModel[] {
        //debugger;        
        let dayInMilliseconds = 1000 * 60 * 60 * 24;
        let monthDiff = 2;
        _.forEach(numberSystems, numberSystem => {
            //debugger            
            let past = new Date(new Date().setMonth(new Date().getMonth() - monthDiff))
            let future = new Date(new Date().setMonth(new Date().getMonth() + 12 + monthDiff))           
            let timeInc = past.getTime();
            let endTime = future.getTime();
            do {
                let canDrawOnthisDay = false;
                let drawTime: Date = null;
                let drawDate = new Date(timeInc);

                if (drawDate.getDay() == TradingDayEnum.Sunday && numberSystem.IsAvailableOnSunday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.SundayEndTimeUTC;
                }
                else if (drawDate.getDay() == TradingDayEnum.Monday && numberSystem.IsAvailableOnMonday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.MondayEndTimeUTC;
                }
                else if (drawDate.getDay() == TradingDayEnum.Tuesday && numberSystem.IsAvailableOnTuesday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.TuesdayEndTimeUTC;
                }
                else if (drawDate.getDay() == TradingDayEnum.Wednesday && numberSystem.IsAvailableOnWednesday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.WednesdayEndTimeUTC;
                }
                else if (drawDate.getDay() == TradingDayEnum.Thursday && numberSystem.IsAvailableOnThursday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.ThursdayEndTimeUTC;
                }
                else if (drawDate.getDay() == TradingDayEnum.Friday && numberSystem.IsAvailableOnFriday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.FridayEndTimeUTC;
                }
                else if (drawDate.getDay() == TradingDayEnum.Saturday && numberSystem.IsAvailableOnSaturday) {
                    canDrawOnthisDay = true;
                    drawTime = numberSystem.SaturdayEndTimeUTC;
                }

                if (canDrawOnthisDay) {
                    let draw = new DrawModel();
                    draw.ID = this.GetNextID();
                    draw.NumberSystemID = numberSystem.ID;
                    draw.CloseTimeUTC = new Date(drawDate.getFullYear(), drawDate.getMonth(), drawDate.getDate(), drawTime.getHours(), drawTime.getMinutes(), drawTime.getSeconds());
                    draw.DrawDateUTC = new Date(draw.CloseTimeUTC.setMinutes(draw.CloseTimeUTC.getMinutes() + 30));
                    draw.DrawStatus = draw.DrawDateUTC.getTime() > new Date().getTime() ? DrawStatusEnum.Open : DrawStatusEnum.Finished;
                    //TODO: If any Trading Day source is void then void draw. draw.DrawDateUTC = DrawStatusEnum.Voided                                                                             
                    numberSystemService.GetDrawedNumbers(numberSystem, draw.DrawDateUTC)
                        .then(drawedNumber => {
                            draw.DrawedNumbers = drawedNumber;
                        });
                    DrawsMock.push(draw);

                }
                timeInc = timeInc + dayInMilliseconds;
            }
            while (timeInc < endTime);

        });

        return DrawsMock;
    }
}

export var DrawsMock: DrawModel[] = [];