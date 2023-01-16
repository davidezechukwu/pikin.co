import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import MemberModel from '../../Security/Models/MemberModel';

export default class LogonHistoryModel extends SuperModel {
    public Member: MemberModel;
    public UserAgentString: string;    
    public IPAddress: string;
    public Longitude: string;
    public Latitude: string;
    public MomentUTC: Date;
}