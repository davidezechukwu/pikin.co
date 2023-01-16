/// <references path=''>
import { Component, Injector, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { TicketService } from '../../../TicketModules/Services/TicketService.ng';
import {TicketModel} from '../../../TicketModules/Models/TicketModel';
import { SuperComponent, ActivatedRouteParams } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';

@Component({
    selector: 'WinningTicketDetailsComponent',
    templateUrl:"./WinningTicketDetailsComponent.ng.html"
})
export default class WinningTicketDetailsComponent extends SuperComponent implements OnInit {
    protected Ticket: TicketModel;
    constructor(
        protected Injector: Injector,        
        protected LocationService: Location,
        protected TicketService: TicketService        
    ) { 
        super(Injector);
    }  
      
    ngOnInit(): void {   
        super.ngOnInit();
        this.ActivatedRouteService.params
            .switchMap((params: ActivatedRouteParams) => this.GetWinningTicket(params['id']))
            .subscribe(win => { this.OnGetWinningTicket(win); });   
    };  

    GetWinningTicket(id: string): Promise<TicketModel>  {
        //return this.TicketService.GetWinningTicket(id);
        return Promise.resolve(null);
    }

    OnGetWinningTicket(ticket: TicketModel): void {
        this.Ticket = ticket;        
    }
}