 import { Injectable } from '@angular/core';
import { SessionModel } from '../Models/SessionModel';
import { CurrencyModel } from '../Models/CurrencyModel';
import { CurrencyAmountModel } from '../Models/CurrencyAmountModel';
import { CurrencyExchangeRateModel } from '../Models/CurrencyExchangeRateModel';
import { CurrenciesMock } from '../_MockModules/CurrencyModelMockDataBuilder';
import { LocationModel } from '../Models/LocationModel';
import { LocationTypesMock } from '../_MockModules/LocationTypeModelMockDataBuilder';
import { LocationsMock } from '../_MockModules/LocationModelMockDataBuilder';
import { LanguageModel } from '../Models/LanguageModel';
import { LanguagesMock } from '../_MockModules/LanguageModelMockDataBuilder';
import { NumberSystemsMock } from '../../../DashboardModules/Game/_MockModules/NumberSystemModelMockDataBuilder';
import { NumberSystemModel } from '../../../DashboardModules/Game/Models/NumberSystemModel';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { GamesMock } from '../../../DashboardModules/Game/_MockModules/GameModelMockDataBuilder';
import { GlobalPropertiesModel } from '../Models/GlobalPropertiesModel';
import { GlobalMockPropertiesModel } from '../Models/GlobalMockPropertiesModel';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    protected _Session: SessionModel | null = null;
    public get Session(): SessionModel| null {
        if (this._Session == null) {
            this._Session = this.Session = this.NewSession();
        }
        return this._Session;
    }
    public set Session(session: SessionModel) {
        this._Session = session;
    }

    protected _NumberSystems: NumberSystemModel[] = [];
    public get NumberSystems(): NumberSystemModel[] {
        if (this._NumberSystems.length == 0 || this._NumberSystems == null) {
            this._NumberSystems = NumberSystemsMock;
        }
        return this._NumberSystems;
    }
    public set NumberSystems(numberSystems: NumberSystemModel[]) {
        this._NumberSystems = numberSystems;
    }

    protected _Games: GameModel[] = []
    public get Games(): GameModel[] {
        if (this._Games.length == 0 || this._Games.length == null) {
            this._Games = GamesMock;
        }
        return this._Games;
    }
    public set Games(games: GameModel[]) {
        this._Games = games;
    }

    protected _Countries: LocationModel[] = [];
    public get Countries(): LocationModel[] {
        if (this._Countries.length == 0 || this._Countries == null) {
            var countryLocationType = LocationTypesMock.find( function (locationType: any) { return locationType.Name.toLowerCase() == "Country".toLowerCase() });
            this._Countries = LocationsMock.filter((location: any) => location.LocationType.ID == countryLocationType!.ID)
        }
        return this._Countries;
    }
    public set Countries(countries: LocationModel[]) {
        this._Countries = countries;
    }

    protected _Currencies: CurrencyModel[] = [];
    public get Currencies(): CurrencyModel[] {
        if (this._Currencies.length == 0 || this._Currencies == null) {
            this._Currencies = CurrenciesMock;
        }
        return this._Currencies;
    }
    public set Currencies(currencies: CurrencyModel[]) {
        this._Currencies = currencies;
    }

    protected _CurrencyExchangeRates: CurrencyExchangeRateModel[] = [];
    public get CurrencyExchangeRates(): CurrencyExchangeRateModel[] {
        return this._CurrencyExchangeRates;
    }
    public set CurrencyExchangeRates(currencyExchangeRates: CurrencyExchangeRateModel[]) {
        this._CurrencyExchangeRates = currencyExchangeRates;
    }

    protected _Languages: LanguageModel[] = [];
    public get Languages(): LanguageModel[] {
        if (this._Languages.length == 0 ||  this._Languages == null) {
            this._Languages = LanguagesMock;
        }
        return this._Languages;
    }
    public set Languages(languages: LanguageModel[]) {
        this._Languages = languages;
    }

    protected _MinimumPaymentAmount: CurrencyAmountModel;
    public get MinimumPaymentAmount(): CurrencyAmountModel {
        return this._MinimumPaymentAmount;
    }
    public set MinimumPaymentAmount(minimumPaymentAmount: CurrencyAmountModel) {
        this._MinimumPaymentAmount = minimumPaymentAmount;
    }

    protected _MaximumPaymentAmount: CurrencyAmountModel;
    public get MaximumPaymentAmount(): CurrencyAmountModel {
        return this._MaximumPaymentAmount;
    }
    public set MaximumPaymentAmount(maximumPaymentAmount: CurrencyAmountModel) {
        this._MaximumPaymentAmount = maximumPaymentAmount;
    }

    protected _defaultCurrency: CurrencyModel | undefined; 
    public get DefaultCurrency(): CurrencyModel {
        var me = this;
        if (this._defaultCurrency != null && this._defaultCurrency != undefined){
            return this._defaultCurrency;
        }
        this._defaultCurrency = CurrenciesMock.find(function (currency: any) { return currency.Name.toLowerCase() == me.GlobalProperties.DefaultCurrencyName.toLowerCase() })!;
        return this._defaultCurrency;
    }

    public GlobalMockProperties: GlobalMockPropertiesModel;
    public GlobalProperties: GlobalPropertiesModel;

    constructor() {
        this.GlobalMockProperties = new GlobalMockPropertiesModel();
        this.GlobalProperties = new GlobalPropertiesModel();
        var me = this;        
        this._MinimumPaymentAmount = new CurrencyAmountModel(me.GlobalProperties.DefaultMinimumPaymentAmount, new CurrencyModel(me.GlobalProperties.DefaultCurrencyName));
        this._MaximumPaymentAmount = new CurrencyAmountModel(me.GlobalProperties.DefaultMaximumPaymentAmount, new CurrencyModel(me.GlobalProperties.DefaultCurrencyName));
    };

    public ClearSession(): void {
        this.Session = this.NewSession();
    }

    protected NewSession(): SessionModel {
        var _Session = new SessionModel();
        var me = this;        
        _Session.CurrentCurrency = CurrenciesMock.find(function (currency: any) { return currency.Name.toLowerCase() == me.GlobalProperties.DefaultCurrencyName.toLowerCase() })!;
        _Session.CurrentLocation = LocationsMock.find(function (_location: any) {
            if (_location.ISO2Code) {
                return _location.ISO2Code.toLowerCase() == me.GlobalProperties.DefaultLocationISO2Code.toLowerCase();
            }else return false;
        })!;
        _Session.CurrentLanguage = LanguagesMock.find(function (language: any) { return language.Name.toLowerCase() == me.GlobalProperties.DefaultLanguageName.toLowerCase() })!;
        _Session.CurrentNumberSystem = NumberSystemsMock.find(function (numberSystem: any) { return numberSystem.Name.toLowerCase() == me.GlobalProperties.DefaultNumberSystemName.toLowerCase() })!;
        _Session.CurrentGame = GamesMock.find(function (game: any) { return game.Name.toLowerCase() == me.GlobalProperties.DefaultGameName.toLowerCase() })!;
        return _Session;
    }
}
