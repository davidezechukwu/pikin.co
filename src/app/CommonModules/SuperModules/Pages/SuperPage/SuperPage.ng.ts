import { Component, Injector, OnInit, DoCheck } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SuperComponent } from '../../Components/SuperComponent/SuperComponent.ng';
import { NavigationService } from '../../../CoreModules/Services/NavigationService.ng';
import SuperPageModel from '../../Models/SuperPageModel';

export default class SuperPage extends SuperComponent implements OnInit, DoCheck {
    protected NavigationService: NavigationService;
    protected TitleService: Title;
    protected Page: SuperPageModel;
    protected PageDoesNotRequiresAuthentication: boolean = false;
    protected PageIsForAuthentication: boolean = false;
    protected PageIsAUseOncePostOnlyPage: boolean = false;
    protected PageIsAUseOncePostOnlyPageProviderData: any[] = [];
    protected PageTitle: string = "";

    public  constructor(
        protected Injector: Injector
    ) {
        super(Injector);
        this.NavigationService = this.Injector.get(NavigationService);
        this.TitleService = this.Injector.get(Title);
    }    

    public ngOnInit(): void {
        super.ngOnInit();
        if (!this.PageDoesNotRequiresAuthentication && !this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/login']);
            return;
        }

        if (this.PageIsForAuthentication && this.AuthenticationService.IsAuthenticated) {
            this.Router.navigate(['/home']);
            return;
        }

        if (this.PageIsAUseOncePostOnlyPage) {
            if (this.constructor.name !== this.SessionService.Session.UseOncePage) {
                this.Router.navigate(this.PageIsAUseOncePostOnlyPageProviderData);                
                return;
            }            
            this.SessionService.Session.UseOncePage = "";
        }

        this.NavigationService.GetPageByName(this.constructor.name)
            .then(page => {
                this.Page = page;
                this.PageTitle = this.Localise(this.Page.PageTitle)                
                this.SetPageTitle();
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetPageByNameFailed, this));
    }

    public ngDoCheck(): void {
        if (this.Page) {
            this.PageTitle = this.Localise(this.Page.PageTitle)
            this.SetPageTitle();
        }
    }

    private SetPageTitle() {
        if (this.Page.PageName === 'HomePage') {
            this.TitleService.setTitle('piKinco - ' + this.PageTitle);
        }
        else {
            this.TitleService.setTitle(this.PageTitle);
        }
    }
}
