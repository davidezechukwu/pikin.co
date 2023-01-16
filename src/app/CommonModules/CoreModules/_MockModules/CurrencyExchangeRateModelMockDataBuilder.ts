import { Injector } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import CurrencyModel from '../Models/CurrencyModel';
import CurrencyExchangeRateModel from '../Models/CurrencyExchangeRateModel';
import CurrencyModelMockDataBuilder from '../_MockModules/CurrencyModelMockDataBuilder';
import SuperModelMockDataBuilder from '../../SuperModules/_MockModules/SuperModelMockDataBuilder';

export default class PaymentMethodModelMockDataBuilder extends SuperModelMockDataBuilder {    
    BuildCurrencyExchangeRatesMock(currencies: CurrencyModel[], injector: Injector): Promise<CurrencyExchangeRateModel[]> {        
        return new Promise<CurrencyExchangeRateModel[]>((resolve, reject) => {
            var http: Http = injector.get(Http);
            var currencyApiAPPID: string = "e45cf9743141432ba90257f034af3854";
            var baseCurrencyApi: string = "https://openexchangerates.org/api/";
            var currencyApiMethod: string = "latest.json";
            var currencyApi: string = baseCurrencyApi + currencyApiMethod + "?app_id=" + currencyApiAPPID;
            http.get(currencyApi)
                .toPromise()
                .then(response => {
                    let USD = _.find(currencies, function (currency) { return currency.Name.toLowerCase() == "USD".toLowerCase() });
                    var rawData = response.json();
                    var currencyExchangeRates: CurrencyExchangeRateModel[] = [];
                    _.forEach(currencies, currency => {
                        var currencyExchangeRate: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
                        currencyExchangeRate.ID = this.GetNextID();
                        currencyExchangeRate.FromCurrency = currency;
                        currencyExchangeRate.ToCurrency = USD;
                        currencyExchangeRate.ToRate = rawData.rates[currency.Name];
                        currencyExchangeRate.FromRate = null;
                        currencyExchangeRate.LastUpdatedOnUTC = new Date();
                        currencyExchangeRates.push(currencyExchangeRate);
                    });
                    resolve(currencyExchangeRates);
                })
                .catch(reason => {
                    let USD = _.find(currencies, function (currency) { return currency.Name.toLowerCase() == "USD".toLowerCase() });
                    var currencyExchangeRates: CurrencyExchangeRateModel[] = [];
                    _.forEach(currencies, currency => {
                        var currencyExchangeRate: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
                        currencyExchangeRate.ID = this.GetNextID();
                        currencyExchangeRate.FromCurrency = currency;
                        currencyExchangeRate.ToCurrency = USD;
                        currencyExchangeRate.ToRate = 1;
                        currencyExchangeRate.FromRate = 1;
                        currencyExchangeRate.LastUpdatedOnUTC = new Date();
                        currencyExchangeRates.push(currencyExchangeRate);
                    });
                    resolve(currencyExchangeRates)
                })
                .catch(reason => {
                    this.BuildNoCurrencyExchangeRatesMockEx(currencies, injector);        
                });
                //.catch(reason => reject(reason));


        });        
    }

    BuildNoCurrencyExchangeRatesMock(currencies: CurrencyModel[], injector: Injector): Promise<CurrencyExchangeRateModel[]> {
        return new Promise<CurrencyExchangeRateModel[]>((resolve, reject) => {
            var currencyExchangeRates: CurrencyExchangeRateModel[] = this.BuildNoCurrencyExchangeRatesMockEx(currencies, injector);            
            resolve(currencyExchangeRates);
        });
    }


    BuildNoCurrencyExchangeRatesMockEx(currencies: CurrencyModel[], injector: Injector): CurrencyExchangeRateModel[] {
        var currencyExchangeRates: CurrencyExchangeRateModel[] = [];
        let USD = _.find(currencies, function (currency) { return currency.Name.toLowerCase() == "USD".toLowerCase() });
        _.forEach(currencies, currency => {
            var currencyExchangeRate: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
            currencyExchangeRate.ID = this.GetNextID();
            currencyExchangeRate.FromCurrency = currency;
            currencyExchangeRate.ToCurrency = USD;
            currencyExchangeRate.ToRate = 1;
            currencyExchangeRate.FromRate = null;
            currencyExchangeRate.LastUpdatedOnUTC = new Date();
            currencyExchangeRates.push(currencyExchangeRate);
        });
        return currencyExchangeRates;
    }
}


