import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { MemberModel } from '../../Security/Models/MemberModel';

export class LogonHistoryModel extends SuperModel {
    public Member: MemberModel = new MemberModel()  ;
    public UserAgentString: string = '';    
    public IPAddress: string = '';
    public Longitude: string = '';
    public Latitude: string = '';
    public MomentUTC: Date = new Date();
}