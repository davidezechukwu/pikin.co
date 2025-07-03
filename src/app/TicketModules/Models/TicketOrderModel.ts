import { SuperModel } from '../../CommonModules/SuperModules/Models/SuperModel';
import { CurrencyAmountModel } from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { TicketOrderStatusEnum } from '../../TicketModules/Models/TicketOrderStatusEnum';
import { GameModel } from '../../DashboardModules/Game/Models/GameModel';
import { GameDrawModel } from '../../DashboardModules/Game/Models/GameDrawModel';
import { CurrencyModel } from '../../CommonModules/CoreModules/Models/CurrencyModel';

export class TicketOrderModel extends SuperModel {    
    public PickedNumbers: string = '';        
    public GameID: number | string = 0;
    public GameDisplayName: string = '';
    public GamePrice: CurrencyAmountModel | null | undefined;
    public GameDrawID: number | string = 0;
    public GameDrawDateUTC: Date | null | undefined;
    public TicketOrderStatus: TicketOrderStatusEnum | null | undefined;
    public TicketOrderStatusDisplayName: string = '';            
    public Game: GameModel | null | undefined;
    public GameDraw: GameDrawModel | null | undefined;
}

