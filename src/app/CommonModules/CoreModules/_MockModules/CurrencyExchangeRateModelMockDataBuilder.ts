import { Injector } from '@angular/core';
import { CurrencyModel } from '../Models/CurrencyModel';
import { CurrencyExchangeRateModel } from '../Models/CurrencyExchangeRateModel';
import { SuperModelMockDataBuilder } from '../../SuperModules/_MockModules/SuperModelMockDataBuilder';
import { HttpClient } from '@angular/common/http';

export class CurrencyExchangeRateModelMockDataBuilder extends SuperModelMockDataBuilder {    
    BuildCurrencyExchangeRatesMock(currencies: CurrencyModel[], injector: Injector): Promise<CurrencyExchangeRateModel[]> {        
        return new Promise<CurrencyExchangeRateModel[]>((resolve, reject) => {
            var http: HttpClient = injector.get(HttpClient);                        
            const currencyApiAPPID: string = "";
            var baseCurrencyApi: string = "https://openexchangerates.org/api/";
            var currencyApiMethod: string = "latest.json";
            if (!currencyApiAPPID){
                alert("You need a (free) OpenExchangeRates Api Key ");
            }
            var currencyApi: string = baseCurrencyApi + currencyApiMethod + "?app_id=" + currencyApiAPPID;
            http.get(currencyApi)
                .toPromise()
                .then((response : any) => {
                    let USD = currencies.find(function (currency: any) { return currency.Name.toLowerCase() == "USD".toLowerCase() });
                    var rawData = response;
                    var currencyExchangeRates: CurrencyExchangeRateModel[] = [];
                    currencies.forEach((currency: any) => {
                        var currencyExchangeRate: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
                        currencyExchangeRate.ID = this.GetNextID();
                        currencyExchangeRate.FromCurrency = currency;
                        currencyExchangeRate.ToCurrency = USD!;
                        currencyExchangeRate.ToRate = rawData.rates[currency.Name];                        
                        currencyExchangeRate.LastUpdatedOnUTC = new Date();
                        currencyExchangeRates.push(currencyExchangeRate);
                    });
                    resolve(currencyExchangeRates);
                })
                .catch((reason: any) => {
                    let USD = currencies.find(function (currency: any) { return currency.Name.toLowerCase() == "USD".toLowerCase() });
                    var currencyExchangeRates: CurrencyExchangeRateModel[] = [];
                    currencies.forEach((currency: any) => {
                        var currencyExchangeRate: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
                        currencyExchangeRate.ID = this.GetNextID();
                        currencyExchangeRate.FromCurrency = currency;
                        currencyExchangeRate.ToCurrency = USD!;
                        currencyExchangeRate.ToRate = 1;
                        currencyExchangeRate.FromRate = 1;
                        currencyExchangeRate.LastUpdatedOnUTC = new Date();
                        currencyExchangeRates.push(currencyExchangeRate);
                    });
                    resolve(currencyExchangeRates)
                })
                .catch((reason: any) => {
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
        let USD = currencies.find(function (currency: any) { return currency.Name.toLowerCase() == "USD".toLowerCase() });
        currencies.forEach((currency: any) => {
            var currencyExchangeRate: CurrencyExchangeRateModel = new CurrencyExchangeRateModel();
            currencyExchangeRate.ID = this.GetNextID();
            currencyExchangeRate.FromCurrency = currency;
            currencyExchangeRate.ToCurrency = USD!;
            currencyExchangeRate.ToRate = 1;            
            currencyExchangeRate.LastUpdatedOnUTC = new Date();
            currencyExchangeRates.push(currencyExchangeRate);
        });
        return currencyExchangeRates;
    }
}


