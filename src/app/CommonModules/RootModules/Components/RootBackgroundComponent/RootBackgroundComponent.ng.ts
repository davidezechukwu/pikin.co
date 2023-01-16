import { Component, Injector, Input } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import MemberModel from '../../../../DashboardModules/Security/Models/MemberModel';

@Component({
    selector: 'RootBackgroundComponent',
    templateUrl: "./RootBackgroundComponent.ng.html",
    styleUrls: ["./RootBackgroundComponent.scss"]
})
export default class RootBackgroundComponent extends SuperComponent {
    @Input()
    public BackgroundVideoUrl: string;
    constructor(
        protected Injector: Injector,
    ) {
        super(Injector);
    };
}




