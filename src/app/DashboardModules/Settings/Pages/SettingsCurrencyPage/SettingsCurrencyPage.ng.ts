import { Component, Injector ,OnInit  } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'SettingsCurrencyPage',
    templateUrl: './SettingsCurrencyPage.ng.html',
    animations: PageAnimations,
    styles: [],
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, FormsModule, RouterModule, CommonModule]
})
export class SettingsCurrencyPage extends SuperPage {
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
        
}
