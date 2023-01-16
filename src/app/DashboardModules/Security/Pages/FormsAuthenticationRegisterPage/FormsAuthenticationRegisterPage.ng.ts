import { Component, Injector } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'FormsAuthenticationRegisterPage',
    templateUrl: './FormsAuthenticationRegisterPage.ng.html',
    animations: PageAnimations
})
export default class FormsAuthenticationRegisterPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = true;
    }
    
    OnFormsAuthenticationRegister(registered:boolean) {
        if (this.AuthenticationService.IsAuthenticated && registered) {
            this.Router.navigate(['/home']);
        }
    }
}
