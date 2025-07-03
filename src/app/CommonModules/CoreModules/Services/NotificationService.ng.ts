import { Injector, Injectable } from '@angular/core';
import {LocalisationService}   from './LocalisationService.ng';

@Injectable()
export class NotificationService {
    protected LocalisationService: LocalisationService;
    constructor(
        public Injector: Injector
    ) { 
        this.LocalisationService = this.Injector.get(LocalisationService);
    };

    private Localise(displayName: string, name?: string ): string {        
        return this.LocalisationService.GetCaptionNow(this.constructor.name, name!, displayName);
    }

    public ShowError(err: string): void {        
        //this.Toaster.error(err, this.Localise(this.LocalisationService.CaptionConstants.Error));
        console.error(err);
    };

    public ShowWarning(warning: string): void {        
        //this.Toaster.warning(warning, this.Localise(this.LocalisationService.CaptionConstants.Warning));        
        console.log(warning);
    };

    public ShowSuccess(info: string): void {        
        //this.Toaster.success(info, this.Localise(this.LocalisationService.CaptionConstants.Success));                        
        console.info(info);
    };    
}