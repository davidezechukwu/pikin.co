import { Component, Input, Injector } from '@angular/core';
import { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { WinningTicketDetailsComponent } from '../../Components/WinningTicketDetailsComponent/WinningTicketDetailsComponent.ng';

@Component({
    selector: 'WinningTicketDetailsPage',
    templateUrl: './WinningTicketDetailsPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, WinningTicketDetailsComponent]
})
export class WinningTicketDetailsPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }
}
