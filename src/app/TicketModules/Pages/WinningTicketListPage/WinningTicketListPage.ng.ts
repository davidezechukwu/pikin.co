import { Component, Input, Injector } from '@angular/core';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'WinningTicketListPage',
    templateUrl: './WinningTicketListPage.ng.html',
    animations: PageAnimations
})
export default class WinningTicketListPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }
}
