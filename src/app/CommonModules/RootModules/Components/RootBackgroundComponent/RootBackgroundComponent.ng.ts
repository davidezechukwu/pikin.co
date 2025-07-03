import { Component, Injector, Input } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'RootBackgroundComponent',
    templateUrl: "./RootBackgroundComponent.ng.html",
    styleUrls: ["./RootBackgroundComponent.scss"],
    imports: [CommonModule]
})
export class RootBackgroundComponent extends SuperComponent {    
    @Input() public BackgroundVideoUrl: string = "";
    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.BackgroundVideoUrl = "/assets/videos/sample" + (new Date().getTime() % 33).toString() + ".mp4";
    };
}




