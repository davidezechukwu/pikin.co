import { Component, Input, Injector } from '@angular/core';
import  { SuperPage }  from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { PlayComponent } from '../../Components/PlayComponent/PlayComponent.ng';
import { FormsAuthenticationLoginComponent } from '../../../DashboardModules/Security/Components/FormsAuthenticationLoginComponent/FormsAuthenticationLoginComponent.ng';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'PlayPage',
    templateUrl: './PlayPage.ng.html',
    styleUrls: ['./PlayPage.scss'],
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, PlayComponent, FormsAuthenticationLoginComponent, CommonModule]  
})
export class PlayPage extends SuperPage {
    constructor(        
        injector: Injector
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }  
}
