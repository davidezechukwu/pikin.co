import { Component, Injector } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'FormsAuthenticationResetPasswordPage',
    templateUrl: './FormsAuthenticationResetPasswordPage.ng.html',
    animations: PageAnimations
})
export default class FormsAuthenticationResetPasswordPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = true;
    }
}
