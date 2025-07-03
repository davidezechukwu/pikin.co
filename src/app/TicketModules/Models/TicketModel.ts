import { SuperModel } from '../../CommonModules/SuperModules/Models/SuperModel';
import { CurrencyAmountModel } from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrencyModel } from '../../CommonModules/CoreModules/Models/CurrencyModel';
import { CurrencyExchangeRateModel } from '../../CommonModules/CoreModules/Models/CurrencyExchangeRateModel';

export enum TicketStatusEnum {    
    Open,    
    Voided,
    Lost,
    Won
}

export class TicketModel extends SuperModel {    
    public PickedNumbers: string | null | undefined;
    public MemberID: number | string | null | undefined;
    public TicketStatus: TicketStatusEnum | null | undefined;
    public TicketStatusDisplayName: string | null | undefined;
    public GameID: number | string | null | undefined;
    public GameDisplayName: string | null | undefined;
    public GamePrice: CurrencyAmountModel | null | undefined;
    public GameDrawID: number | string | null | undefined;
    public GameDrawDateUTC: Date | null | undefined;
    public CurrencyExchangeRate: CurrencyExchangeRateModel | null | undefined;
    public WinID: null | number | string | undefined;
    public AdditionalData: null | string |  undefined;
    public AdditionalDataType: null | string | undefined;
}

