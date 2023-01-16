import { Component, Injector, OnInit } from '@angular/core';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteParams } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import * as _ from 'lodash';
import 'rxjs/add/operator/switchMap';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { TicketService } from '../../Services/TicketService.ng';
import { TicketModel } from '../../Models/TicketModel';


@Component({
    selector: 'TicketDetailsPage',
    templateUrl: './TicketDetailsPage.ng.html',
    animations: PageAnimations
})
export default class TicketDetailsPage extends SuperPage implements OnInit {
    protected Ticket: TicketModel;
    constructor(        
        protected Injector: Injector,
        protected TicketService: TicketService
    ) {        
        super(Injector);        
    }  

    public ngOnInit(): void {        
        super.ngOnInit();

        this.ActivatedRouteService.paramMap
            .switchMap((params: ActivatedRouteParams) => this.TicketService.GetTicket(params.get('id')))
            .subscribe((ticket: TicketModel) =>  this.Ticket = ticket);        
    }    
}
