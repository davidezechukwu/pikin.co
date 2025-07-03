import { Component, Injector } from '@angular/core';
import  { SuperPage } from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { FormsAuthenticationResetPasswordComponent } from '../../Components/FormsAuthenticationResetPasswordComponent/FormsAuthenticationResetPasswordComponent.ng';    

@Component({
    selector: 'FormsAuthenticationResetPasswordPage',
    templateUrl: './FormsAuthenticationResetPasswordPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, FormsAuthenticationResetPasswordComponent]
})
export class FormsAuthenticationResetPasswordPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = true;
    }
}
