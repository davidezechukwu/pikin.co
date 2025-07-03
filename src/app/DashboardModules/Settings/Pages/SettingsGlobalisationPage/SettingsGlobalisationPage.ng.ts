import { Component, Injector ,OnInit, ɵComponentFactory  } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
    
@Component({
    selector: 'SettingsGlobalisationPage',
    templateUrl: './SettingsGlobalisationPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, FormsModule, ReactiveFormsModule, RouterModule   ]
})
export class SettingsGlobalisationPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
