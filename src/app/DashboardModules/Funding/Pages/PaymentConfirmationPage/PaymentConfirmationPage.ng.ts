import { Component, Injector, OnInit } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import CurrencyAmountModel from '../../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { FundingService } from '../../Services/FundingService.ng';
import {PaymentService}   from '../../Services/PaymentService.ng';
import { PaymentMethodModel } from '../../Models/PaymentMethodModel';


@Component({
    selector: 'PaymentConfirmationPage',
    templateUrl: './PaymentConfirmationPage.ng.html',
    animations: PageAnimations
})
export default class PaymentConfirmationPage extends SuperPage implements OnInit {
    protected SelectedPaymentMethod: PaymentMethodModel;
    protected FundingAmount: number
    constructor(
        protected Injector: Injector,
        protected PaymentService: PaymentService,
        protected FundingService: FundingService
    ) {
        super(Injector);
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }
}
