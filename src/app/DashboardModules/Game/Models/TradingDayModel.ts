import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import LocationModel from '../../../CommonModules/CoreModules/Models/LocationModel';
import SourceModel from './SourceModel';
import { TradingDayStatusEnum } from './TradingDayStatusEnum';

export default class TradingDayModel extends SuperModel {        
    public SourceID: number | string;    
    public TradingDayStatus: TradingDayStatusEnum;        
    public CloseValue: string;
    public CloseTimeUTC: Date;
    //Navigation Properties    
    public Source: SourceModel;
}
