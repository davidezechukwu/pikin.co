import { Component, Injector,OnInit  } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import {PaymentService}   from '../../Services/PaymentService.ng';
import { PaymentMethodModel } from '../../Models/PaymentMethodModel';


@Component({
    selector: 'AddFundsPage',
    templateUrl: './AddFundsPage.ng.html',
    animations: PageAnimations
})
export default class AddFundsPage extends SuperPage implements OnInit {
    protected PaymentMethods: PaymentMethodModel[] = [];
    protected SelectedPaymentMethod: PaymentMethodModel;
    constructor(
        protected Injector: Injector,
        protected PaymentService: PaymentService
    ) {
        super(Injector);
    }

    public ngOnInit(): void {        
        super.ngOnInit();
        var me = this;
        this.PaymentService.GetPaymentMethods()
            .then(paymentMethods => me.PaymentMethods = paymentMethods)
            .catch(reason => me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.ErrorGetPaymentMethodsFailed, this));
    }    
}
