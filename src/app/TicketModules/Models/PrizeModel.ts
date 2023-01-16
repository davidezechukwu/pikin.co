import SuperModel from '../../CommonModules/SuperModules/Models/SuperModel';
import GameModel from '../../DashboardModules/Game/Models/GameModel';
import CurrencyAmountModel from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';

export default class PrizeModel extends SuperModel {
    public Game: GameModel;
    public WinPrice: CurrencyAmountModel;    
    public MatchingNoDigits: number;
}
