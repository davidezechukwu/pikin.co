import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrencyModel } from '../../../CommonModules/CoreModules/Models/CurrencyModel';
import { NumberSystemModel } from './NumberSystemModel';

export class GameModel extends SuperModel {        
    public NumberSystemID: number | string |  undefined;
    public RequiredMatches: number |  undefined;  
    public Price: CurrencyAmountModel | null | undefined;
    public NumberSystem: NumberSystemModel | null | undefined;
}