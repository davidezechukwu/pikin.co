import { Injectable, Injector } from '@angular/core';
import  * as _ from 'lodash';
import { SessionService } from '../../../CommonModules/CoreModules/Services/SessionService.ng';
import {SuperService}   from '../../../CommonModules/SuperModules/Services/SuperService.ng';
import TicketOrderModel from '../../../TicketModules/Models/TicketOrderModel';
import { TicketOrderStatusEnum } from '../../../TicketModules/Models/TicketOrderStatusEnum';
import GameModel from '../Models/GameModel';
import NumberSystemModel from '../Models/NumberSystemModel';
import GameDrawModel from '../Models/GameDrawModel';
import DrawDaysOptions from '../Models/DrawDaysOptions';
import { NumberSystemService } from '../Services/NumberSystemService.ng';
import { GamesMock } from '../_MockModules/GameModelMockDataBuilder';
import { GameDrawsMock } from '../_MockModules/GameDrawModelMockDataBuilder';

@Injectable()
export class GameService extends SuperService {    
    constructor(
        protected Injector : Injector,
        protected SessionService: SessionService,
        protected NumberSystemService: NumberSystemService
    ) {
        super(Injector);
    };

    protected GetNextWorkingDay(fromDate: Date) {
        // Get today's date and set new date based on parameter value
        var nextWorkingDay = new Date(fromDate);

        // friday
        if (fromDate.getDay() == 5) {
            //TODO: if number system is not available on Saturday and Sunday
            nextWorkingDay.setDate(nextWorkingDay.getDate() + 3);
        }
        // Sat
        else if (fromDate.getDay() == 6) {
            //TODO: if number system is not available on Sunday
            nextWorkingDay.setDate(nextWorkingDay.getDate() + 2);
        }
        //else if (fromDate.getDay() == 0) {

        //    nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
        //}
        else {
            nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
        }

        // Return required date string
        return nextWorkingDay;
    }

    GetGameWithRequiredMatches(numberSystemID: number | string,  numberOfMatches: number): Promise<GameModel> {
        var me = this;
        return new Promise<GameModel>((resolve, reject) => {
            var game = _.find(GamesMock, game => { return (game.NumberSystemID == numberSystemID) && (game.RequiredMatches == numberOfMatches); });            
            if (game) { resolve(game); } else { reject("No  game with that number of matching was found"); }
        });
    }

    GetGame(gameID: number | string): Promise<GameModel> {
        var me = this;
        return new Promise<GameModel>((resolve, reject) => {
            var game = _.find(GamesMock, function (game) {
                return game.ID == gameID;
            });
            if (game) {
                this.NumberSystemService.GetNumberSystem(game.NumberSystemID)
                    .then(numberSystem => {
                        game.NumberSystem = numberSystem;
                        resolve(game);
                    })
                    .catch(reason => reject(reason));                
            } else {
                reject("No game matching the GameID " + gameID + " was found");
            }
        });
    }    

    GetNextGameDraw(game: GameModel, currentDateUTC: Date): Promise<GameDrawModel> {
        var me = this;
        return new Promise<GameDrawModel>((resolve, reject) => {
            //debugger;            
            var gameDraw = _.find(GameDrawsMock, _gameDraw => {
                var nextWorkingDay = this.GetNextWorkingDay(currentDateUTC);                
                return game.ID == _gameDraw.GameID
                    && nextWorkingDay.getUTCFullYear() == _gameDraw.Draw.DrawDateUTC.getUTCFullYear()
                    && nextWorkingDay.getUTCMonth() == _gameDraw.Draw.DrawDateUTC.getUTCMonth()
                    && nextWorkingDay.getUTCDate() == _gameDraw.Draw.DrawDateUTC.getUTCDate();
            });
            if (gameDraw) { resolve(gameDraw); } else { reject("No game draw matching the GameID " + game.ID + " was found and date " + currentDateUTC.toString()); }
        });
    }

    GeTicketOrders(game: GameModel, currentDateUTC: Date, pickedNumbers: string,  drawDaysOptions: DrawDaysOptions, weeks: number): Promise<TicketOrderModel[]> {
        var me = this;
        return new Promise<TicketOrderModel[]>((resolve, reject) => {
            //debugger;         
            let id = 0;
            let nextWorkingDay = me.GetNextWorkingDay(currentDateUTC);
            let now = new Date(nextWorkingDay);
            let to = new Date(nextWorkingDay);
            let days: number = weeks * 7;
            to.setDate(to.getDate() + days);            

            var ticketOrders: TicketOrderModel[] = [];                
            for (var d = new Date(nextWorkingDay); d <= to; d.setDate(d.getDate() + 1)) { 
                let drawDate = new Date(d);

                let canPlay = false;
                if (drawDate.getUTCDay() === 0 && drawDaysOptions.IsAvailableOnSunday === true && drawDaysOptions.Sunday === true ) {
                    canPlay = true;
                }
                else if (drawDate.getUTCDay() === 1 && drawDaysOptions.IsAvailableOnMonday === true && drawDaysOptions.Monday === true ) {
                    canPlay = true;
                }
                else if (drawDate.getUTCDay() === 2 && drawDaysOptions.IsAvailableOnTuesday === true && drawDaysOptions.Tuesday === true ) {
                    canPlay = true;
                }
                else if (drawDate.getUTCDay() === 3 && drawDaysOptions.IsAvailableOnWednesday === true && drawDaysOptions.Wednesday === true ) {
                    canPlay = true;
                }
                else if (drawDate.getUTCDay() === 4 && drawDaysOptions.IsAvailableOnThursday === true && drawDaysOptions.Thursday === true ) {
                    canPlay = true;
                }
                else if (drawDate.getUTCDay() === 5 && drawDaysOptions.IsAvailableOnFriday === true && drawDaysOptions.Friday === true ) {
                    canPlay = true;
                }
                else if (drawDate.getUTCDay() === 6 && drawDaysOptions.IsAvailableOnSaturday === true && drawDaysOptions.Saturday === true ) {
                    canPlay = true;
                }

                if (canPlay) {
                    var gameDraw = _.find(GameDrawsMock, _gameDraw => {
                        return game.ID === _gameDraw.GameID
                            && drawDate.getUTCFullYear() === _gameDraw.Draw.DrawDateUTC.getUTCFullYear()
                            && drawDate.getUTCMonth() === _gameDraw.Draw.DrawDateUTC.getUTCMonth()
                            && drawDate.getUTCDate() === _gameDraw.Draw.DrawDateUTC.getUTCDate();
                    });
                    if (gameDraw) {
                        let ticketOrder: TicketOrderModel = new TicketOrderModel();                        
                        ticketOrder.CreatedOnUTC = new Date();
                        ticketOrder.Description = game.Description;
                        ticketOrder.DisplayName = pickedNumbers;
                        ticketOrder.Name = game.Name;
                        ticketOrder.Game = game;                                   
                        ticketOrder.GameDisplayName = game.DisplayName;
                        ticketOrder.GameDrawDateUTC = gameDraw.Draw.DrawDateUTC;
                        ticketOrder.GamePrice = game.Price;
                        ticketOrder.GameDraw = gameDraw;
                        ticketOrder.GameDrawID = gameDraw.ID;                        
                        ticketOrder.ID = (++id).toString();                        
                        ticketOrder.PickedNumbers = pickedNumbers;
                        ticketOrder.TicketOrderStatus = TicketOrderStatusEnum.Available;
                        ticketOrder.TicketOrderStatusDisplayName = TicketOrderStatusEnum[TicketOrderStatusEnum.Available].toString();
                        ticketOrders.push(ticketOrder)                        
                    }
                }
            }
                                            
            resolve(ticketOrders);
        });
    } 
}

