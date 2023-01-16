import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';

export default class FundingCheckBalanceResultModel {    
    public HasEnoughFunding: boolean;
    public Balance: CurrencyAmountModel;    
    public RequiredAmount: CurrencyAmountModel;    
}

