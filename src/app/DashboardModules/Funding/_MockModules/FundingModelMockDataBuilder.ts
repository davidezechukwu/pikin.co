import { FundingModel } from '../Models/FundingModel'
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { SessionService}   from '../../../CommonModules/CoreModules/Services/SessionService.ng';
import { SuperModelMockDataBuilder } from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import { MemberModel } from '../../Security/Models/MemberModel';

export class FundingModelMockDataBuilder extends SuperModelMockDataBuilder {
    constructor() {
        super();
    }

    BuildMock(member: MemberModel): FundingModel {        
        let sessionService = new SessionService()        
        member.Funding = new FundingModel();
        member.Funding.ID = this.GetNextID();
        member.Funding.MemberID = member.ID;
        member.Funding.Balance = new CurrencyAmountModel(Math.round((Math.random() % sessionService.GlobalMockProperties.FundingDailyAmountAdjuster) * sessionService.GlobalMockProperties.FundingAdjuster), sessionService.Session?.CurrentCurrency!);                   
        return member.Funding;
    }
}

