import { Component, Injector } from '@angular/core';
import { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RouterModule } from '@angular/router';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';


@Component({
    selector: 'ContactUsByWebChatPage',
    templateUrl: './ContactUsByWebChatPage.ng.html',
    styleUrls: ["./ContactUsByWebChatPage.scss"],
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]
})
export class ContactUsByWebChatPage extends SuperPage {
    public SelectedGame: GameModel = new GameModel();
    constructor(
        injector: Injector        
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }    
}


