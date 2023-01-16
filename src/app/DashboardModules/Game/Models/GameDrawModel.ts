import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import GameModel from './GameModel';
import DrawModel  from './DrawModel';
import { GameDrawStatusEnum } from './GameDrawStatusEnum';


export default class GameDrawModel extends SuperModel {
    public GameID: number | string;
    public DrawID: number | string;
    public DrawStatus: GameDrawStatusEnum;    
    public DrawedNumbers: string;

    //Navigation Properties
    public Draw: DrawModel;
    public Game: GameModel;
}