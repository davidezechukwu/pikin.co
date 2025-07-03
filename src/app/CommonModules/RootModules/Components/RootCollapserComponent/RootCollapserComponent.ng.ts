import { Component, Injector, Input } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';

@Component({    
    selector: 'RootCollapserComponent',
    templateUrl: "RootCollapserComponent.ng.html",
    styleUrls: ["RootCollapserComponent.scss"]
})
export class RootCollapserComponent extends SuperComponent {
    constructor(
        injector: Injector,
    ) {
        super(injector);
    };
}
