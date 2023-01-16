import { Component, Injector, OnInit } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'CorrespondenceHomePage',
    templateUrl: './CorrespondenceHomePage.ng.html',
    animations: PageAnimations
})
export default class CorrespondenceHomePage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }
        
}
