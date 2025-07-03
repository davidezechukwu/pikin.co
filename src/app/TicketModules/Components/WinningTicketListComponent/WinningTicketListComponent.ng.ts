import { Component, Input, OnInit, Injector } from '@angular/core';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import {GameService}  from '../../../DashboardModules/Game/Services/GameService.ng';
import {NumberSystemService}  from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import { TicketService } from '../../Services/TicketService.ng';
import { PrizeModel } from '../../Models/PrizeModel';
import { CommonModule } from '@angular/common';


@Component({
    selector: "WinningTicketListComponent",
    templateUrl: "./WinningTicketListComponent.ng.html",
    styleUrls: ["./WinningTicketListComponent.scss"],
    imports: [CommonModule]
})

export class WinningTicketListComponent extends SuperComponent implements OnInit  {
    public WinningTickets: PrizeModel[] = [];    
    public SelectedWin: PrizeModel = new PrizeModel();    

    constructor(        
        injector: Injector,         
        protected GameService: GameService, 
        protected NumberSystemService: NumberSystemService, 
        protected TicketService: TicketService
    ) { 
        super(injector);
    };    
        
    override ngOnInit(): void {
        super.ngOnInit();
        this.GetWinningTickets(0, 0);
    }    

    OnSelect(win: PrizeModel): void {
        this.SelectedWin = win;        
    }; 

    GoToDetail(): void {
        this.Router.navigate(['/WinningTickets/', this.SelectedWin.ID]);
    };

    GetWinningTickets(fromPage: number, toPage: number): void {
        var me = this;
        //this.TicketService.GetWinningTickets(this.SessionService.Session?.CurrentGame)
        //    .then(WinningTickets => this.WinningTickets = WinningTickets)
        //    .catch(reason => {
                
        //    });    
    }
}




