import { Component, Injector, OnInit } from '@angular/core';
import SuperPage from '../../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../../CommonModules/CoreModules/Animations/PageAnimations';
import CurrencyAmountModel from '../../../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { FundingService } from '../../../../../DashboardModules/Funding/Services/FundingService.ng';
import {PaymentService}   from '../../../Services/PaymentService.ng';
import { PaymentMethodModel } from '../../../Models/PaymentMethodModel';

@Component({
    selector: 'DemoPaymentMethodPage',
    templateUrl: './DemoPaymentMethodPage.ng.html',
    animations: PageAnimations
})
export default class DemoPaymentMethodPage extends SuperPage implements OnInit {
    protected SelectedPaymentMethod: PaymentMethodModel;
    protected FundingAmount: number
    protected MinimumPaymentAmount: number;
    protected MaximumPaymentAmount: number;

    constructor(
        protected Injector: Injector,
        protected PaymentService: PaymentService,
        protected FundingService: FundingService
    ) {
        super(Injector);
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.FundingAmount = this.PaymentService.GetMinimumPaymentAmountInSessionCurrency();
        this.MinimumPaymentAmount = this.PaymentService.GetMinimumPaymentAmountInSessionCurrency();
        this.MaximumPaymentAmount = this.PaymentService.GetMaximumPaymentAmountInSessionCurrency();
    }

    protected OnAddFunds(): void {
        var me = this;
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => {
                var funds: CurrencyAmountModel = new CurrencyAmountModel(me.FundingAmount, me.SessionService.Session.CurrentCurrency);
                me.FundingService.AddFunding(member, funds)
                    .then(funding => { this.Router.navigate(["/dashboard/funding/paymentconfirmation"]) })
                    .catch(reason => me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.Error, me));
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
    }
}
