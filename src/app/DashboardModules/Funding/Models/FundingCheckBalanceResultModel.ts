import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrencyModel } from '../../../CommonModules/CoreModules/Models/CurrencyModel';

export class FundingCheckBalanceResultModel {    
    public HasEnoughFunding: boolean = false ;
    public Balance: CurrencyAmountModel | null | undefined;
    public Message: string = '';    
    public RequiredAmount: CurrencyAmountModel | null | undefined;
}

