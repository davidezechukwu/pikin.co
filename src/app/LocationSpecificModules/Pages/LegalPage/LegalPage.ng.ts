﻿import { Component, Input, OnInit, Injector } from '@angular/core';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'LegalPage',
    templateUrl: './LegalPage.ng.html',
    styleUrls: ["./LegalPage.scss"],
    animations: PageAnimations   
})
export default class LegalPage extends SuperPage {
    public SelectedGame: GameModel;
    constructor(
        protected Injector: Injector        
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }    
}
 

