import { Component, Injector ,OnInit  } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'NumberSystemHomePage',
    templateUrl: './NumberSystemHomePage.ng.html',
    animations: PageAnimations
})
export default class NumberSystemHomePage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }
        
}
