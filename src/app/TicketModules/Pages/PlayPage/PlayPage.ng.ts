import { Component, Input, Injector } from '@angular/core';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'PlayPage',
    templateUrl: './PlayPage.ng.html',
    styleUrls: ['./PlayPage.scss'],
    animations: PageAnimations
})
export default class PlayPage extends SuperPage {
    constructor(        
        protected Injector: Injector
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }  
}
