import { Component, Injector } from '@angular/core';
import { SuperPage } from '../../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'SentMessagesPage',
    templateUrl: './SentMessagesPage.ng.html',
    animations : PageAnimations,
    styleUrls: [],
    styles:[],
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]
})
export class SentMessagesPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
