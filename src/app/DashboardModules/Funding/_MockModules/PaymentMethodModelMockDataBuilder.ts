import { Injector } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { PaymentMethodModel, PaymentMethodTypeEnum } from '../Models/PaymentMethodModel';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import PaymentMethodLocatrionModelMockDataBuilder from './PaymentMethodLocatrionModelMockDataBuilder';

export default class PaymentMethodModelMockDataBuilder extends SuperModelMockDataBuilder {    
    BuildMocks(): PaymentMethodModel[] {
        var paymentMethodModels: PaymentMethodModel[] = [];       
        var demo = new PaymentMethodModel();
        demo.ID = this.GetNextID();
        demo.Name = this.CaptionConstants.PaymentMethodTypeDemo;
        demo.DisplayName = this.CaptionConstants.PaymentMethodTypeDemo;
        demo.RouterProviderData = "/dashboard/funding/paymentmethods/demo";
        demo.PaymentMethodType = PaymentMethodTypeEnum.Demo;
        demo.PaymentMethodLocations = new PaymentMethodLocatrionModelMockDataBuilder().BuildMocks(demo);
        paymentMethodModels.push(demo);        
        return paymentMethodModels;
    }
}

export var PaymentMethodsMock = new PaymentMethodModelMockDataBuilder().BuildMocks();


