import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { FundingModel}  from '../../../DashboardModules/Funding/Models/FundingModel';
import { TicketModel } from '../../../TicketModules/Models/TicketModel';

export class MemberModel extends SuperModel {             
    public Username: string = '';   
    public Funding: FundingModel = new FundingModel();    
    public Tickets: TicketModel[] = [];
}
