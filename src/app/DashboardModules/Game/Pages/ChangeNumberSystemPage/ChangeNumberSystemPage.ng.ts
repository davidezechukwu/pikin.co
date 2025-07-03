import { Component, Injector ,OnInit  } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'ChangeNumberSystemPage',
    templateUrl: './ChangeNumberSystemPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]
})
export class ChangeNumberSystemPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
