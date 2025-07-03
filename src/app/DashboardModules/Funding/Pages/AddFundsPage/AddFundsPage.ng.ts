import { Component, Injector,OnInit  } from '@angular/core';
import { SuperPage } from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import {PaymentService}   from '../../Services/PaymentService.ng';
import { PaymentMethodModel } from '../../Models/PaymentMethodModel';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'AddFundsPage',
    templateUrl: './AddFundsPage.ng.html',
    animations: PageAnimations,
    styleUrls: [],
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, CommonModule   ]
})
export class AddFundsPage extends SuperPage implements OnInit {
    protected PaymentMethods: PaymentMethodModel[] = [];
    protected SelectedPaymentMethod: PaymentMethodModel = new PaymentMethodModel();
    constructor(
        injector: Injector,
        protected PaymentService: PaymentService
    ) {
        super(injector);
    }

    public override ngOnInit(): void {        
        super.ngOnInit();
        var me = this;
        this.PaymentService.GetPaymentMethods()
            .then(paymentMethods => me.PaymentMethods = paymentMethods)
            .catch(reason => me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.ErrorGetPaymentMethodsFailed, this));
    }    
}
