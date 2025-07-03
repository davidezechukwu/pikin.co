import { Component, Injector } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { FormsAuthenticationRegisterComponent } from '../../Components/FormsAuthenticationRegisterComponent/FormsAuthenticationRegisterComponent.ng';


@Component({
    selector: 'FormsAuthenticationRegisterPage',
    templateUrl: './FormsAuthenticationRegisterPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, FormsAuthenticationRegisterComponent],    
})
export class FormsAuthenticationRegisterPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = true;
    }
    
    OnFormsAuthenticationRegister(registered:boolean) {
        if (this.AuthenticationService.IsAuthenticated && registered) {
            this.Router.navigate(['/home']);
        }
    }
}
