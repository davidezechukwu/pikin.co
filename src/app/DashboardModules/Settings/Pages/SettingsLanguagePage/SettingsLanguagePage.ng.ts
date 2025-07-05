import { Component, Injector ,OnInit  } from '@angular/core';
import { SuperPage } from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'SettingsLanguagePage',
    templateUrl: './SettingsLanguagePage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, FormsModule, RouterModule, CommonModule]
})
export class SettingsLanguagePage extends SuperPage {    
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
