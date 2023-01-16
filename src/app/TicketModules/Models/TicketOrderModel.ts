import SuperModel from '../../CommonModules/SuperModules/Models/SuperModel';
import CurrencyAmountModel from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import CurrencyExchangeRateModel from '../../CommonModules/CoreModules/Models/CurrencyExchangeRateModel';
import { TicketOrderStatusEnum } from '../../TicketModules/Models/TicketOrderStatusEnum';
import GameModel from '../../DashboardModules/Game/Models/GameModel';
import GameDrawModel from '../../DashboardModules/Game/Models/GameDrawModel';

export default class TicketOrderModel extends SuperModel {    
    public PickedNumbers: string;        
    public GameID: number | string;
    public GameDisplayName: string;
    public GamePrice: CurrencyAmountModel;
    public GameDrawID: number | string;
    public GameDrawDateUTC: Date;    
    public TicketOrderStatus: TicketOrderStatusEnum;        
    public TicketOrderStatusDisplayName: string;        
    //navigational properties
    public Game: GameModel;
    public GameDraw: GameDrawModel;
}

