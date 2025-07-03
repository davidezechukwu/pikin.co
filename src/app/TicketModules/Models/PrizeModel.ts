import { SuperModel }  from '../../CommonModules/SuperModules/Models/SuperModel';
import { GameModel } from '../../DashboardModules/Game/Models/GameModel';
import { CurrencyModel } from '../../CommonModules/CoreModules/Models/CurrencyModel';
import { CurrencyAmountModel } from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';

export class PrizeModel extends SuperModel {
    public Game: GameModel = new GameModel();
    public WinPrice: CurrencyAmountModel | null | undefined;
    public MatchingNoDigits: number = 0;
}
