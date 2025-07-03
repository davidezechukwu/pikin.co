
import { LocationModel } from './LocationModel';
import { CurrencyModel } from './CurrencyModel';
import { LanguageModel } from './LanguageModel';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { NumberSystemModel } from '../../../DashboardModules/Game/Models/NumberSystemModel';

export class SessionModel  {
    private _CurrentNumberSystem: NumberSystemModel | null | undefined;
    public UseOncePage: string = "";
    public get CurrentNumberSystem(): NumberSystemModel | null | undefined {
        return this._CurrentNumberSystem;
    }
    public set CurrentNumberSystem(numberSystem: NumberSystemModel) {
        if ((this.CurrentNumberSystem == null || numberSystem == null) || (this.CurrentNumberSystem.ID != numberSystem.ID)) {
            this.CurrentGame = null;
        }
        this._CurrentNumberSystem = numberSystem;

    }
    public ShowFullDates: boolean=true;
    public ShowDateAsUTC: boolean = false;
    public CurrentCurrency: CurrencyModel | null | undefined;
    public CurrentLanguage: LanguageModel | null | undefined;
    public CurrentLocation: LocationModel | null | undefined;
    public CurrentGame: GameModel | null | undefined;
    public CurrentPickedNumbers: string = "";       
    public DisableAnimations: boolean = false;
    public IsOnLowSpeedConnection: boolean  = false;    
}
