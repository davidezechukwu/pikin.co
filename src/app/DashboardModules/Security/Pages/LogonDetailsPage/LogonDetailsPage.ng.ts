import { Component, Injector } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'LogonDetailsPage',
    templateUrl: './LogonDetailsPage.ng.html',
    animations: PageAnimations
})
export default class LogonDetailsPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }

}
