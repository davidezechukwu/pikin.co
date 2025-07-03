import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { GameModel } from './GameModel';
import { DrawModel }  from './DrawModel';
import { GameDrawStatusEnum } from './GameDrawStatusEnum';


export class GameDrawModel extends SuperModel {
    public GameID: number | string = 0;
    public DrawID: number | string = 0;
    public DrawStatus: GameDrawStatusEnum = GameDrawStatusEnum.Open;    
    public DrawedNumbers: string = '';
    public Draw: DrawModel = new DrawModel();
    public Game: GameModel = new GameModel();
}