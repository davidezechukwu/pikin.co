import SuperModel from '../../CommonModules/SuperModules/Models/SuperModel';
import CurrencyAmountModel from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import CurrencyExchangeRateModel from '../../CommonModules/CoreModules/Models/CurrencyExchangeRateModel';

export enum TicketStatusEnum {    
    Open,    
    Voided,
    Lost,
    Won
}

export class TicketModel extends SuperModel {    
    public PickedNumbers: string;
    public MemberID: number | string;
    public TicketStatus: TicketStatusEnum;    
    public TicketStatusDisplayName: string;        
    public GameID: number | string;
    public GameDisplayName: string;
    public GamePrice: CurrencyAmountModel;
    public GameDrawID: number | string;
    public GameDrawDateUTC: Date;
    public CurrencyExchangeRate: CurrencyExchangeRateModel;
    public WinID: null | number | string;    
    public AdditionalData: null | string;
    public AdditionalDataType: null | string;                   
}

