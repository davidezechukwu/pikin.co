import { Component, Injector, OnInit } from '@angular/core';
import SuperPage from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'FundingHomePage',
    templateUrl: './FundingHomePage.ng.html',
    animations: PageAnimations
})
export default class FundingHomePage extends SuperPage {
    constructor(
        protected Injector: Injector
    ) {
        super(Injector);
    }

}
