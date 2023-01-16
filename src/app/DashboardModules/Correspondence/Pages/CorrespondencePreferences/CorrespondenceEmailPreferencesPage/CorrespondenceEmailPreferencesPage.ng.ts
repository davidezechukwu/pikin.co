import { Component, Injector, OnInit } from '@angular/core';
import SuperPage from '../../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'CorrespondenceEmailPreferencesPage',
    templateUrl: './CorrespondenceEmailPreferencesPage.ng.html',
    animations: PageAnimations
})
export default class CorrespondenceEmailPreferencesPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }
        
}
