import { Injector } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { PaymentMethodModel, PaymentMethodTypeEnum } from '../Models/PaymentMethodModel';
import PaymentMethodLocationModel  from '../Models/PaymentMethodLocationModel';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import { LocationTypesMock } from '../../../CommonModules/CoreModules/_MockModules/LocationTypeModelMockDataBuilder';
import { LocationsMock } from '../../../CommonModules/CoreModules/_MockModules/LocationModelMockDataBuilder';

export default class PaymentMethodLocatrionModelMockDataBuilder extends SuperModelMockDataBuilder {    
    public BuildMocks(paymentMethodModel: PaymentMethodModel): PaymentMethodLocationModel[] {                
        if (paymentMethodModel.PaymentMethodType == PaymentMethodTypeEnum.Demo) {
            return this.BuildMocksForDemo(paymentMethodModel);
        }
        return [];
    }

    protected BuildMocksForDemo(paymentMethod: PaymentMethodModel): PaymentMethodLocationModel[] {        
        var paymentMethodLocations: PaymentMethodLocationModel[] = [];
        var countryLocationType = _.find(LocationTypesMock, function (locationType) { return locationType.Name.toLowerCase() == "Country".toLowerCase() });
        var countries = _.filter(LocationsMock, location => location.LocationType.ID == countryLocationType.ID);
        _.forEach(countries, country => {
            var paymentMethodLocation = new PaymentMethodLocationModel();
            paymentMethodLocation.ID = this.GetNextID();
            paymentMethodLocation.PaymentMethodID = paymentMethod.ID;
            paymentMethodLocation.LocationID = country.ID;
            paymentMethodLocations.push(paymentMethodLocation);
        });
        return paymentMethodLocations;
    }

}


