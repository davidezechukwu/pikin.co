import { Component, Injector } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'UsePINAuthenticationPage',
    templateUrl: './UsePINAuthenticationPage.ng.html',
    animations: PageAnimations
})
export default class UsePINAuthenticationPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }

}
