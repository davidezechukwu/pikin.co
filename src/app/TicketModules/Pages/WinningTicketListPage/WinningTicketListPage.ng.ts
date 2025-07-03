import { Component, Input, Injector } from '@angular/core';
import { SuperPage }from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { WinningTicketListComponent } from '../../Components/WinningTicketListComponent/WinningTicketListComponent.ng';

@Component({
    selector: 'WinningTicketListPage',
    templateUrl: 'WinningTicketListPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, WinningTicketListComponent] 
})
export class WinningTicketListPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }
}
