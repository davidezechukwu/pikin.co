import { Injectable, Injector } from '@angular/core';
import { SuperService } from '../../../CommonModules/SuperModules/Services/SuperService.ng';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { PaymentMethodModel, PaymentMethodTypeEnum } from '../Models/PaymentMethodModel';
import { PaymentMethodsMock } from '../_MockModules/PaymentMethodModelMockDataBuilder';


@Injectable()
export class PaymentService extends SuperService {    
    constructor(protected Injector: Injector) {
        super(Injector);

    };

    public GetPaymentMethods() : Promise<PaymentMethodModel[]> {
        return Promise.resolve(PaymentMethodsMock);
    }    

    public GetMinimumPaymentAmountInSessionCurrency(): number {
        var _ret = Math.round(this.GlobalisationService.ToSessionCurrency(this.SessionService.MinimumPaymentAmount).Amount);
        if (_ret < 1) {
            _ret = 1;
        }
        return _ret;
    }

    public GetMaximumPaymentAmountInSessionCurrency(): number {
        var _ret = Math.round(this.GlobalisationService.ToSessionCurrency(this.SessionService.MaximumPaymentAmount).Amount);
        if (_ret < 1) {
            _ret = 1;
        }
        return _ret;
    }
}
