import { Component, Injector ,OnInit  } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'AboutTheCurrentNumberSystemPage',
    templateUrl: './AboutTheCurrentNumberSystemPage.ng.html',
    animations: PageAnimations
})
export default class AboutTheCurrentNumberSystemPage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }
        
}
