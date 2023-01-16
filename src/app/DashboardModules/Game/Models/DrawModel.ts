import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import NumberSystemModel from './NumberSystemModel';
import { DrawStatusEnum } from './DrawStatusEnum';

export default class DrawModel extends SuperModel {    
    public NumberSystemID: number | string;
    public DrawStatus: DrawStatusEnum;
    public DrawDateUTC: Date;
    public DrawedNumbers: string;    
    public CloseTimeUTC: Date; 

    //Navigation Properties
    public NumberSystem: NumberSystemModel;
}
    