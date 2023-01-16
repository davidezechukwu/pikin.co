import * as _ from 'lodash';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrenciesMock } from '../../../CommonModules/CoreModules/_MockModules/CurrencyModelMockDataBuilder';
import CurrencyModel from '../../../CommonModules/CoreModules/Models/CurrencyModel';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import GameModel from '../Models/GameModel';
import GameDrawModel from '../Models/GameDrawModel';
import NumberSystemModel from '../Models/NumberSystemModel';
import { DrawStatusEnum } from '../Models/DrawStatusEnum';
import { GameDrawStatusEnum } from '../Models/GameDrawStatusEnum';
import { NumberSystemsMock } from './NumberSystemModelMockDataBuilder';
import { NumberSystemService } from '../Services/NumberSystemService.ng';
import { DrawsMock } from '../_MockModules/DrawModelMockDataBuilder';

export enum DayStatusEnum {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export default class GameDrawModelMockDataBuilder extends SuperModelMockDataBuilder {
    constructor() {
        super();
    }

    public BuildGameDrawMocks(games: GameModel[], numberSystem: NumberSystemModel): GameDrawModel[] {
        //debugger;
        if (GameDrawsMock.length != 0) {
            return GameDrawsMock;
        }
        _.forEach(games, game => {
            _.forEach(DrawsMock, draw => {
                //debugger;
                var gameDraw: GameDrawModel = new GameDrawModel();
                gameDraw.ID = this.GetNextID();
                gameDraw.CreatedOnUTC = new Date();
                gameDraw.Description = game.Description;
                gameDraw.DisplayName = game.DisplayName;
                gameDraw.DrawedNumbers = "";
                gameDraw.Draw = draw;
                gameDraw.DrawID = draw.ID;
                if (draw.DrawStatus == DrawStatusEnum.Voided) {
                    gameDraw.DrawStatus = GameDrawStatusEnum.Voided;
                }
                else {
                    var now = new Date();
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    var isPast = draw.DrawDateUTC < now_utc;
                    gameDraw.DrawStatus = isPast ? GameDrawStatusEnum.Finished : GameDrawStatusEnum.Open;
                }
                gameDraw.DrawStatus = GameDrawStatusEnum.Open;
                gameDraw.Game = game;
                gameDraw.GameID = game.ID;
                gameDraw.Name = game.Name;
                gameDraw.UpdatedOnUTC = new Date();
                GameDrawsMock.push(gameDraw);
            });
        });

        return GameDrawsMock;
    }
}

export var GameDrawsMock: GameDrawModel[] = [];