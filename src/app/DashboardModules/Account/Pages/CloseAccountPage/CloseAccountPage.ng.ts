import { Component, Injector } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'CloseAccountPage',
    templateUrl: './CloseAccountPage.ng.html',
    animations: PageAnimations
})
export default class CloseAccountPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }

}
