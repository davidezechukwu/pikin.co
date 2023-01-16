import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';

export default class FundingModel extends SuperModel {    
    public MemberID: number | string;
    public Balance: CurrencyAmountModel;    
}

