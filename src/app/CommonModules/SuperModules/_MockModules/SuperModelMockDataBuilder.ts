import { Injector } from '@angular/core';
//import { HttpModule, Http } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
//import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import CaptionConstantsModel from '../../CoreModules/Models/CaptionConstantsModel';
import CurrencyModel from '../../CoreModules/Models/CurrencyModel';
import CurrencyAmountModel from '../../CoreModules/Models/CurrencyAmountModel';
import GlobalPropertiesModel from '../../CoreModules/Models/GlobalPropertiesModel';
import GlobalMockPropertiesModel from '../../CoreModules/Models/GlobalMockPropertiesModel';
import { CurrenciesMock } from '../../CoreModules/_MockModules/CurrencyModelMockDataBuilder';

export default class SuperModelMockDataBuilder {        
    private CurrentID: number = 0;
    protected GetNextID(): any {
        return (++this.CurrentID).toString();
    }

    private CurrentIDLevel2: number = 0;
    protected GetNextIDLevel2(): any {
        return (++this.CurrentIDLevel2).toString();
    }

    private CurrentIDLevel3: number = 0;
    protected GetNextIDLevel3(): any {
        return (++this.CurrentIDLevel3).toString();
    }

    protected CaptionConstants: CaptionConstantsModel = new CaptionConstantsModel();
    protected DefaultCurrency: CurrencyModel;
    protected GlobalProperties: GlobalPropertiesModel;
    protected GlobalMockProperties: GlobalMockPropertiesModel;

    constructor() {           
        this.GlobalProperties = new GlobalPropertiesModel();
        this.GlobalMockProperties = new GlobalMockPropertiesModel();
        var me = this;
        this.DefaultCurrency = _.find(CurrenciesMock, function (currency) { return currency.Name.toLowerCase() == me.GlobalProperties.DefaultCurrencyName.toLowerCase() });
        if (!this.DefaultCurrency) {
            throw "Default Currency could not be found";
        }
    }
}