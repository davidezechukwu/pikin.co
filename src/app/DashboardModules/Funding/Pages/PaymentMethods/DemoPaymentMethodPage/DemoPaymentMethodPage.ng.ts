import { Component, Injector, OnInit } from '@angular/core';
import  { SuperPage }  from '../../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { CurrencyAmountModel } from '../../../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { FundingService } from '../../../../../DashboardModules/Funding/Services/FundingService.ng';
import {PaymentService}   from '../../../Services/PaymentService.ng';
import { PaymentMethodModel } from '../../../Models/PaymentMethodModel';
import { RootCollapserComponent } from '../../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'DemoPaymentMethodPage',
    templateUrl: './DemoPaymentMethodPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, FormsModule]
})
export class DemoPaymentMethodPage extends SuperPage implements OnInit {
    protected SelectedPaymentMethod: PaymentMethodModel = new PaymentMethodModel();
    protected FundingAmount: number = 0;
    protected MinimumPaymentAmount: number = 0;
    protected MaximumPaymentAmount: number = 0;

    constructor(
        injector: Injector,
        protected PaymentService: PaymentService,
        protected FundingService: FundingService
    ) {
        super(injector);
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.FundingAmount = this.PaymentService.GetMinimumPaymentAmountInSessionCurrency();
        this.MinimumPaymentAmount = this.PaymentService.GetMinimumPaymentAmountInSessionCurrency();
        this.MaximumPaymentAmount = this.PaymentService.GetMaximumPaymentAmountInSessionCurrency();
    }

    protected OnAddFunds(): void {
        var me = this;
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => {
                var funds: CurrencyAmountModel = new CurrencyAmountModel(me.FundingAmount, me.SessionService.Session?.CurrentCurrency!);
                me.FundingService.AddFunding(member!, funds)
                    .then(funding => { this.Router.navigate(["/dashboard/funding/paymentconfirmation"]) })
                    .catch(reason => me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.Error, me));
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.Error, this));
    }
}
