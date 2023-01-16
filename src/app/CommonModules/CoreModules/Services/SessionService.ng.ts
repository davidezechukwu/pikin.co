import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import SessionModel from '../Models/SessionModel';
import CurrencyModel from '../Models/CurrencyModel';
import CurrencyAmountModel from '../Models/CurrencyAmountModel';
import CurrencyExchangeRateModel from '../Models/CurrencyExchangeRateModel';
import { CurrenciesMock } from '../_MockModules/CurrencyModelMockDataBuilder';
import CurrencyExchangeRateModelMockDataBuilder from '../_MockModules/CurrencyExchangeRateModelMockDataBuilder';
import LocationModel from '../Models/LocationModel';
import { LocationTypesMock } from '../_MockModules/LocationTypeModelMockDataBuilder';
import { LocationsMock } from '../_MockModules/LocationModelMockDataBuilder';
import LanguageModel from '../Models/LanguageModel';
import { LanguagesMock } from '../_MockModules/LanguageModelMockDataBuilder';
import { NumberSystemsMock } from '../../../DashboardModules/Game/_MockModules/NumberSystemModelMockDataBuilder';
import NumberSystemModel from '../../../DashboardModules/Game/Models/NumberSystemModel';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import { GamesMock } from '../../../DashboardModules/Game/_MockModules/GameModelMockDataBuilder';
import GlobalPropertiesModel from '../Models/GlobalPropertiesModel';
import GlobalMockPropertiesModel from '../Models/GlobalMockPropertiesModel';

@Injectable()
export class SessionService {
    protected _Session: SessionModel = null;
    public get Session(): SessionModel {
        if (this._Session == null) {
            this._Session = this.Session = this.NewSession();
        }
        return this._Session;
    }
    public set Session(session: SessionModel) {
        this._Session = session;
    }

    protected _NumberSystems: NumberSystemModel[] = null;
    public get NumberSystems(): NumberSystemModel[] {
        if (this._NumberSystems == null) {
            this._NumberSystems = NumberSystemsMock;
        }
        return this._NumberSystems;
    }
    public set NumberSystems(numberSystems: NumberSystemModel[]) {
        this._NumberSystems = numberSystems;
    }

    protected _Games: GameModel[] = null;
    public get Games(): GameModel[] {
        if (this._Games == null) {
            this._Games = GamesMock;
        }
        return this._Games;
    }
    public set Games(games: GameModel[]) {
        this._Games = games;
    }

    protected _Countries: LocationModel[] = null;
    public get Countries(): LocationModel[] {
        if (this._Countries == null) {
            var countryLocationType = _.find(LocationTypesMock, function (locationType) { return locationType.Name.toLowerCase() == "Country".toLowerCase() });
            this._Countries = _.filter(LocationsMock, location => location.LocationType.ID == countryLocationType.ID)
        }
        return this._Countries;
    }
    public set Countries(countries: LocationModel[]) {
        this._Countries = countries;
    }

    protected _Currencies: CurrencyModel[] = null;
    public get Currencies(): CurrencyModel[] {
        if (this._Currencies == null) {
            this._Currencies = CurrenciesMock;
        }
        return this._Currencies;
    }
    public set Currencies(currencies: CurrencyModel[]) {
        this._Currencies = currencies;
    }

    protected _CurrencyExchangeRates: CurrencyExchangeRateModel[] = null;
    public get CurrencyExchangeRates(): CurrencyExchangeRateModel[] {
        return this._CurrencyExchangeRates;
    }
    public set CurrencyExchangeRates(currencyExchangeRates: CurrencyExchangeRateModel[]) {
        this._CurrencyExchangeRates = currencyExchangeRates;
    }

    protected _Languages: LanguageModel[] = null;
    public get Languages(): LanguageModel[] {
        if (this._Languages == null) {
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

    public GlobalMockProperties: GlobalMockPropertiesModel;
    public GlobalProperties: GlobalPropertiesModel;

    constructor() {
        this.GlobalMockProperties = new GlobalMockPropertiesModel();
        this.GlobalProperties = new GlobalPropertiesModel();
        var me = this;
        var defaultCurrency = _.find(CurrenciesMock, function (currency) { return currency.Name.toLowerCase() == me.GlobalProperties.DefaultCurrencyName.toLowerCase() });
        this._MinimumPaymentAmount = new CurrencyAmountModel(me.GlobalProperties.DefaultMinimumPaymentAmount, defaultCurrency);
        this._MaximumPaymentAmount = new CurrencyAmountModel(me.GlobalProperties.DefaultMaximumPaymentAmount, defaultCurrency);
    };

    public ClearSession(): void {
        this.Session = this.NewSession();
    }

    protected NewSession(): SessionModel {
        var _Session = new SessionModel();
        var me = this;
        //debugger;
        _Session.CurrentCurrency = _.find(CurrenciesMock, function (currency) { return currency.Name.toLowerCase() == me.GlobalProperties.DefaultCurrencyName.toLowerCase() });
        _Session.CurrentLocation = _.find(LocationsMock, function (_location) {
            if (_location.ISO2Code) {
                return _location.ISO2Code.toLowerCase() == me.GlobalProperties.DefaultLocationISO2Code.toLowerCase();
            }
        });
        _Session.CurrentLanguage = _.find(LanguagesMock, function (language) { return language.Name.toLowerCase() == me.GlobalProperties.DefaultLanguageName.toLowerCase() });
        _Session.CurrentNumberSystem = _.find(NumberSystemsMock, function (numberSystem) { return numberSystem.Name.toLowerCase() == me.GlobalProperties.DefaultNumberSystemName.toLowerCase() });
        _Session.CurrentGame = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.GlobalProperties.DefaultGameName.toLowerCase() });
        return _Session;
    }
}
