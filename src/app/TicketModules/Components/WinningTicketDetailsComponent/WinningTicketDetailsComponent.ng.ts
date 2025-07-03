import { Component, Injector, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TicketService } from '../../../TicketModules/Services/TicketService.ng';
import { TicketModel } from '../../../TicketModules/Models/TicketModel';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';

@Component({
    selector: 'WinningTicketDetailsComponent',
    templateUrl: './WinningTicketDetailsComponent.ng.html'
})
export class WinningTicketDetailsComponent extends SuperComponent implements OnInit {
    protected Ticket: TicketModel = new TicketModel();

    constructor(
        injector: Injector,
        protected LocationService: Location,
        protected TicketService: TicketService,
        protected ActivatedRoute: ActivatedRoute
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.ActivatedRoute.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    from(this.GetWinningTicket(params.get('id') ?? ''))
                )
            )
            .subscribe({
                next: (ticket: TicketModel | null) => {
                    if (ticket) {
                        this.OnGetWinningTicket(ticket);
                    }
                },
                error: (err) => {
                    // Handle error if needed
                    console.error('Failed to load ticket', err);
                }
            });
    }

    protected GetWinningTicket(id: string): Promise<TicketModel | null> {
        // return this.TicketService.GetWinningTicket(id);
        return Promise.resolve(null);
    }

    protected OnGetWinningTicket(ticket: TicketModel): void {
        this.Ticket = ticket;
    }
}
