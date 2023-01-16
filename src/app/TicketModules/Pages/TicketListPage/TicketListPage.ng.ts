import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { TicketService } from '../../Services/TicketService.ng';
import { TicketModel } from '../../Models/TicketModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';

@Component({
    selector: 'TicketListPage',
    templateUrl: './TicketListPage.ng.html',
    animations: PageAnimations
})
export default class TicketListPage extends SuperPage implements OnInit {
    protected State: State = {
        skip: 0,
        take: 5,
        sort: [{ field: "GameDrawDateUTC", dir: "asc" }],
        filter: {
            logic: "and",
            filters: []
        },
        group: []
    };
    protected StateOptions = {
        sortable: {
            allowUnsort: 'allowUnsort',
            mode: 'multiple'
        },
        filterable: false,
        pageSize: 5,
        pageable: {
            buttonCount: this.State.take,
            info: false,
            type: 'numeric',
            pageSizes: [5, 10, 20, 50, 100],
            previousNext: true
        },
        scrollable: "none"
    };    
    protected Tickets: TicketModel[];    
    protected SelectedTicket: TicketModel;    
    constructor(        
        protected Injector: Injector,
        protected TicketService: TicketService
    ) {
        super(Injector);        
    }  

    public ngOnInit(): void {
        super.ngOnInit();
        var me = this;
        this.AuthenticationService.GetAuthenticatedMember()
            .then(member => me.TicketService.GetTickets(member)                
                .then(tickets => me.Tickets = tickets)
                .catch(reason => me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.Error, me)))
            .catch(reason => me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.ErrorGetGetAuthenticatedMemberFailed, me));
        
    }

    public OnDataStateChange(dataStateChangeEvent: DataStateChangeEvent): void {
        this.State = $.extend({}, this.State, dataStateChangeEvent);
    }

    public OnSelect(memberTicket : TicketModel): void {
        this.SelectedTicket = memberTicket;
    }; 

}
