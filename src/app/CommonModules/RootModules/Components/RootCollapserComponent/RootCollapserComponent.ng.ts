import { Component, Injector, Input } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import MemberModel from '../../../../DashboardModules/Security/Models/MemberModel';

@Component({    
    selector: 'RootCollapserComponent',
    templateUrl: "./RootCollapserComponent.ng.html",
    styleUrls: ["./RootCollapserComponent.scss"]
})
export default class RootCollapserComponent extends SuperComponent {
    constructor(
        protected Injector: Injector,
    ) {
        super(Injector);
    };
}




