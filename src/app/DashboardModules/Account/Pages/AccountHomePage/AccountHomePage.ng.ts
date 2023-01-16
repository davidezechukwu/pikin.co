import { Component, Injector  } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'AccountHomePage',
    templateUrl: './AccountHomePage.ng.html',
    animations: PageAnimations
})
export default class AccountHomePage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }
      
}
