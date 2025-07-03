import { Component, Injector, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { TicketService } from '../../Services/TicketService.ng';
import { TicketModel } from '../../Models/TicketModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'TicketListPage',
    templateUrl: './TicketListPage.ng.html',
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, GridModule, SafePipe, CommonModule]
})
export class TicketListPage extends SuperPage implements OnInit {
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
    protected Tickets: TicketModel[] = [];    
    protected SelectedTicket: TicketModel = new TicketModel();    
    constructor(        
        injector: Injector,
        protected TicketService: TicketService
    ) {
        super(injector);        
    }  

    public override ngOnInit(): void {
        super.ngOnInit();
        var me = this;
        this.AuthenticationService.GetAuthenticatedMember()
            .then( (member: any) => me.TicketService.GetTickets(member)                
                .then((tickets: any) => me.Tickets = tickets)
                .catch((reason: any) => { throw new Error(reason )}))
            .catch((reason: any) => { throw new Error(reason) });
        
    }

    public OnDataStateChange(dataStateChangeEvent: DataStateChangeEvent): void {
        this.State = {...this.State, ...dataStateChangeEvent};
    }

    public OnSelect(memberTicket : TicketModel): void {
        this.SelectedTicket = memberTicket;
    }; 

}
