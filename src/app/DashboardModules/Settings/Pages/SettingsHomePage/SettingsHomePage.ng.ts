import { Component, Injector   } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';

@Component({
    selector: 'SettingsHomePage',
    templateUrl: './SettingsHomePage.ng.html',
    animations: PageAnimations,
    styles: [],
    imports: [RootCollapserComponent, RootBackgroundComponent]
})
export class SettingsHomePage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
