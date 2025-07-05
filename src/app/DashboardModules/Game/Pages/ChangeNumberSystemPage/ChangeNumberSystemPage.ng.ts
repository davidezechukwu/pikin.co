import { Component, Injector ,OnInit  } from '@angular/core';
import  { SuperPage }  from '../../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { PageAnimations } from '../../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { NumberSystemService } from '../../Services/NumberSystemService.ng'

@Component({
    selector: 'ChangeNumberSystemPage',
    templateUrl: './ChangeNumberSystemPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]
})

export class ChangeNumberSystemPage extends SuperPage {
    protected PlaySpeed: number = 1500;

    constructor(
        injector: Injector,
        protected NumberSystemService: NumberSystemService 
    ) {
        super(injector);
    }
    
    public override ngOnInit(){
        super.ngOnInit();
        this.PlaySpeed = this.NumberSystemService.RefreshInterval;
    }

    protected OnSliderChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.PlaySpeed = +input.value;               
        var refreshInterval = this.PlaySpeed;
        this.NumberSystemService.ChangeNumbersRefreshTimer(refreshInterval);
    }
}
