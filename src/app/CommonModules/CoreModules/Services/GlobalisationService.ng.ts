import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import CurrencyAmountModel from '../Models/CurrencyAmountModel';
import CurrencyModel from '../Models/CurrencyModel';
import CurrencyExchangeRateModel from '../Models/CurrencyExchangeRateModel';
import {SessionService}   from './SessionService.ng';
import {LocalisationService}   from './LocalisationService.ng';

@Injectable()
export class GlobalisationService {
    protected SessionService: SessionService;
    protected LocalisationService: LocalisationService;
    constructor(
        protected Injector: Injector        
    ) {        
        this.SessionService = this.Injector.get(SessionService);   
        this.LocalisationService = this.Injector.get(LocalisationService);   
    };    

    public FormatDate(date: Date): string {
        var ret: string = '';
        if (this.SessionService.Session.ShowDateAsUTC) {
            if (this.SessionService.Session.ShowFullDates) {
                ret = date.toUTCString();
            }
            else{
                var date2 = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
                ret = date.toLocaleString();
            }
        } else {
            if (this.SessionService.Session.ShowFullDates) {
                ret = date.toString();
            }
            else {                
                ret = date.toLocaleString([this.SessionService.Session.CurrentLanguage.ISO639_1Code]);
            }
        }
        return this.TidyUpDate( ret );
    }

    public FormatLongDate(date: Date): string {
        var ret: string = '';
        if (this.SessionService.Session.ShowDateAsUTC) {
            ret = date.toUTCString();
        } else {
            ret = date.toString();
        }
        return this.TidyUpDate(ret);
    }

    private TidyUpDate(dateString: string) {
        var _dateString = dateString;
        if (_dateString.indexOf('GMT') >= 0) {
            _dateString = dateString.substring(0, dateString.indexOf('GMT'));
        }
        return _dateString;
    }

    public FormatCurrency(currencyAmount: CurrencyAmountModel, stylise?: boolean): string {
        let _currencyAmount = currencyAmount;
        if (!stylise) {
            return _currencyAmount.Currency.Symbol + _currencyAmount.Amount.toFixed(Math.round(currencyAmount.Currency.DecimalDigits)).toString();
        }
        else {
            return "<strong class='CurrencySymbol' >" + _currencyAmount.Currency.Symbol + "</strong>" + "<span class='CurrencyAmount'>" + _currencyAmount.Amount.toFixed(Math.round(currencyAmount.Currency.DecimalDigits)).toString() + "</span>";
        }
    }

    public SwitchAmountToOtherCurrency(fromAmount: CurrencyAmountModel, toCurrency: CurrencyModel): CurrencyAmountModel {
        if (fromAmount.Currency.ID == toCurrency.ID) {
            return fromAmount;
        }

        var fromCurrencyUSDexchangeRate = _.find(this.SessionService.CurrencyExchangeRates, currencyExchangeRate => {
            return (currencyExchangeRate.FromCurrency.ID == fromAmount.Currency.ID &&
                currencyExchangeRate.ToCurrency.Name == "USD");
        });

        var convertedUSDAmount: number = fromAmount.Amount / fromCurrencyUSDexchangeRate.ToRate;
        if (toCurrency.Name != "USD") {
            var toCurrencyUSDexchangeRate = _.find(this.SessionService.CurrencyExchangeRates, currencyExchangeRate => {
                return (currencyExchangeRate.FromCurrency.ID == toCurrency.ID &&
                    currencyExchangeRate.ToCurrency.Name == "USD");
            });
            convertedUSDAmount = convertedUSDAmount * toCurrencyUSDexchangeRate.ToRate;
        }
        return new CurrencyAmountModel(convertedUSDAmount, toCurrency);
    }

    public ToSessionCurrency(froCurrencyAmountModel: CurrencyAmountModel): CurrencyAmountModel {
        return this.SwitchAmountToOtherCurrency(froCurrencyAmountModel, this.SessionService.Session.CurrentCurrency);
    }

    
}
