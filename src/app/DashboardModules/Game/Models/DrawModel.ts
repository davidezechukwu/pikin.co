import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { NumberSystemModel } from './NumberSystemModel';
import { DrawStatusEnum } from './DrawStatusEnum';

export class DrawModel extends SuperModel {    
    public NumberSystemID: number | string = 0;
    public DrawStatus: DrawStatusEnum = DrawStatusEnum.Open;
    public DrawDateUTC: Date = new Date();
    public DrawedNumbers: string = '';    
    public CloseTimeUTC: Date = new Date(); 
    public NumberSystem: NumberSystemModel = new NumberSystemModel();
}
    