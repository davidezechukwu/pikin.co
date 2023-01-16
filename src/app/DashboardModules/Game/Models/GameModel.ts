import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import NumberSystemModel from './NumberSystemModel';

export default class GameModel extends SuperModel {        
    public NumberSystemID: number | string;
    public RequiredMatches: number;    
    public Price: CurrencyAmountModel;    

    //Navigation Properties
    public NumberSystem: NumberSystemModel;
}