import { Injector, Component } from '@angular/core';
import { SuperPage } from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { FormsAuthenticationLoginComponent } from '../../Components/FormsAuthenticationLoginComponent/FormsAuthenticationLoginComponent.ng';

@Component({
    selector: 'FormsAuthenticationLoginPage',
    templateUrl: './FormsAuthenticationLoginPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, FormsAuthenticationLoginComponent]
})
export class FormsAuthenticationLoginPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = true;
    }

    OnFormsAuthenticationLogin(authenticated: boolean) {
        if (this.AuthenticationService.IsAuthenticated && authenticated) {
            this.Router.navigate(['/home']);
        }
    }
}
