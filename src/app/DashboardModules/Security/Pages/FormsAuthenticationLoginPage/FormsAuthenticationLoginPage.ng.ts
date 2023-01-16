import { Injector, Component } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'FormsAuthenticationLoginPage',
    templateUrl: './FormsAuthenticationLoginPage.ng.html',
    animations: PageAnimations
})
export default class FormsAuthenticationLoginPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = true;
    }

    OnFormsAuthenticationLogin(authenticated: boolean) {
        if (this.AuthenticationService.IsAuthenticated && authenticated) {
            this.Router.navigate(['/home']);
        }
    }
}
