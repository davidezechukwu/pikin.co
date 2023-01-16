import { Injector, Component, OnInit, AfterContentChecked, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { AuthenticationService } from '../../../../DashboardModules/Security/Services/AuthenticationService.ng';
import { MemberService } from '../../../../DashboardModules/Security/Services/MemberService.ng';
import { GlobalisationService } from '../../../CoreModules/Services/GlobalisationService.ng';
import { LocalisationService } from '../../../CoreModules/Services/LocalisationService.ng';
import { SessionService } from '../../../CoreModules/Services/SessionService.ng';
import { ErrorHandlingService } from '../../../CoreModules/Services/ErrorHandlingService.ng';
import { NotificationService } from '../../../CoreModules/Services/NotificationService.ng';
import EntityCaptionsModel from '../../../CoreModules/Models/EntityCaptionsModel';
import CaptionModel from '../../../CoreModules/Models/CaptionModel';


export class SuperComponent implements OnInit, AfterContentChecked, DoCheck {
    protected ActivatedRouteService: ActivatedRoute;
    protected AuthenticationService: AuthenticationService;
    protected ErrorHandlingService: ErrorHandlingService;
    protected GlobalisationService: GlobalisationService;
    protected LocalisationService: LocalisationService;
    protected NotificationService: NotificationService;
    protected MemberService: MemberService;
    protected Router: Router;
    protected SessionService: SessionService;
    protected EntityCaptions: EntityCaptionsModel = null;
    public ErrorMessage: string;
    protected BackgroundVideoUrl: string;

    public constructor(
        protected Injector: Injector
    ) {
        this.Router = this.Injector.get(Router);
        this.ActivatedRouteService = this.Injector.get(ActivatedRoute);
        this.AuthenticationService = this.Injector.get(AuthenticationService);
        this.SessionService = this.Injector.get(SessionService);
        this.ErrorHandlingService = this.Injector.get(ErrorHandlingService);
        this.NotificationService = this.Injector.get(NotificationService);
        this.MemberService = this.Injector.get(MemberService);
        this.GlobalisationService = this.Injector.get(GlobalisationService);
        this.LocalisationService = this.Injector.get(LocalisationService);

        this.BackgroundVideoUrl = "/assets/videos/sample" + (new Date().getTime() % 33).toString() + ".mp4";
    }
    
    public ngOnInit(): void {
        //TODO: 
        //for tdd do something to ensure that this has been called by it's overriden equivalent'
        //so for example, 
        // if (inTest or DebugMode){record(this.constructor.name +  " ngOnInit")}        
        this.LocalisationService.GetCaptions(this.constructor.name)
            .then(entityCaptions => this.EntityCaptions = entityCaptions)
            .catch(reason => {
                this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetCaptionsFailed, this);
            });
    };

    public ngDoCheck(): void {
        //TODO: 
        //for tdd do something to ensure that this has been called by it's overriden equivalent'
        //so for example, 
        // if (inTest or DebugMode){record(this.constructor.name +  " ngDoCheck")}
    }

    public ngAfterContentChecked(): void {
        //TODO: 
        //for tdd do something to ensure that this has been called by it's overriden equivalent'
        //so for example, 
        // if (inTest or DebugMode){record(this.constructor.name +  " ngAfterContentChecked")}
    };

    public Localise(displayName: string, name?: string, ...formatData: string[]): string {
        var phrase = this.LocalisationService.GetCaptionNow(this.constructor.name, name, displayName);
        for (var c = 0; c < formatData.length; c++) {
            phrase = phrase.replace("{" + c + "}", formatData[c]);
        }
        return phrase;
    }
}

export { Params as ActivatedRouteParams } from '@angular/router';