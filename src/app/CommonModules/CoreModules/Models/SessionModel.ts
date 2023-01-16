import SuperModel from '../../SuperModules/Models/SuperModel';
import LocationModel from './LocationModel';
import CurrencyModel from './CurrencyModel';
import LanguageModel from './LanguageModel';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import NumberSystemModel from '../../../DashboardModules/Game/Models/NumberSystemModel';

export default class SessionModel  {
    private _CurrentNumberSystem: NumberSystemModel;
    public UseOncePage: string = "";
    public get CurrentNumberSystem(): NumberSystemModel {
        return this._CurrentNumberSystem;
    }
    public set CurrentNumberSystem(numberSystem: NumberSystemModel) {
        if ((this.CurrentNumberSystem == null || numberSystem == null) || (this.CurrentNumberSystem.ID != numberSystem.ID)) {
            this.CurrentGame = null;
        }
        this._CurrentNumberSystem = numberSystem;

    }
    public ShowFullDates: boolean=true;
    public ShowDateAsUTC: boolean;
    public CurrentCurrency: CurrencyModel;
    public CurrentLanguage: LanguageModel;
    public CurrentLocation: LocationModel;    
    public CurrentGame: GameModel;
    public CurrentPickedNumbers: string;       
    public DisableAnimations: boolean;
    public IsOnLowSpeedConnection: boolean;    
}
