
import { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { TicketService } from '../../Services/TicketService.ng';
import { TicketModel } from '../../Models/TicketModel';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ticket-details-page',
    templateUrl: 'TicketDetailsPage.ng.html',
    styleUrls: [],
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, CommonModule]
})
export class TicketDetailsPageComponent
    extends SuperPage
    implements OnInit {
    protected Ticket!: TicketModel;

    constructor(
        injector: Injector,
        protected TicketService: TicketService,
        private ActivatedRoute: ActivatedRoute
    ) {
        super(injector);
    }

    override  ngOnInit(): void {
        super.ngOnInit();

        this.ActivatedRoute.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    this.TicketService.getTicket(params.get('id')!)
                )
            )
            .subscribe((t: any) => {
                this.Ticket = t;
            });
    }
}
