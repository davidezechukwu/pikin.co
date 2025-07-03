import { Component, Injector, OnInit } from '@angular/core';
import {SuperPage} from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { FundingService } from '../../Services/FundingService.ng';
import {PaymentService}   from '../../Services/PaymentService.ng';
import { PaymentMethodModel } from '../../Models/PaymentMethodModel';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'PaymentConfirmationPage',
    templateUrl: './PaymentConfirmationPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]   
})
export class PaymentConfirmationPage extends SuperPage implements OnInit {
    protected SelectedPaymentMethod: PaymentMethodModel = new PaymentMethodModel();
    protected FundingAmount: number = 0;
    constructor(
        injector: Injector,
        protected PaymentService: PaymentService,
        protected FundingService: FundingService
    ) {
        super(injector);
    }

    public override ngOnInit(): void {
        super.ngOnInit();
    }
}
