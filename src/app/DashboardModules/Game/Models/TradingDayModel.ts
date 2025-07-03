import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { SourceModel} from './SourceModel';
import { TradingDayStatusEnum } from './TradingDayStatusEnum';

export class TradingDayModel extends SuperModel {        
    public SourceID: number | string = '';    
    public TradingDayStatus: TradingDayStatusEnum = TradingDayStatusEnum.Open;        
    public CloseValue: string = '';
    public CloseTimeUTC: Date = new Date();
    //Navigation Properties    
    public Source: SourceModel = new SourceModel();
}
