import {SuperModel} from '../../../CommonModules/SuperModules/Models/SuperModel';
import {CurrencyAmountModel} from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrencyModel } from '../../../CommonModules/CoreModules/Models/CurrencyModel';

export class FundingModel extends SuperModel {    
    public MemberID: number | string = '';
    public Balance: CurrencyAmountModel | null | undefined; 
}

