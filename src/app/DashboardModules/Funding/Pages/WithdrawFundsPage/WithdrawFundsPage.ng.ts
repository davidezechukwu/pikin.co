import { Component, Injector   } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'WithdrawFundsPage',
    templateUrl: './WithdrawFundsPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]
})
export class WithdrawFundsPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
