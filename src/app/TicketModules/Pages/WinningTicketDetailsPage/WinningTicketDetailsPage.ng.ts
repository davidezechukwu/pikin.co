import { Component, Input, Injector } from '@angular/core';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'WinningTicketDetailsPage',
    templateUrl: './WinningTicketDetailsPage.ng.html',
    animations: PageAnimations
})
export default class WinningTicketDetailsPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }
}
