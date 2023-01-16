import { Component, Injector } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'AutomaticSignOutPage',
    templateUrl: './AutomaticSignOutPage.ng.html',
    animations: PageAnimations
})
export default class AutomaticSignOutPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }

}
