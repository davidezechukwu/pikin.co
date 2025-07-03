import { timer } from 'rxjs';
import { Injector, Injectable } from '@angular/core';
import { SessionService } from './SessionService.ng';
import { CachingService } from './CachingService.ng';
import { CaptionModel } from '../Models/CaptionModel';
import { EntityCaptionsModel } from '../Models/EntityCaptionsModel';
import { CaptionConstantsModel } from '../Models/CaptionConstantsModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'      
    })
};

@Injectable()
export class LocalisationService {
    private CurrentID: number = 0;
    protected SessionService: SessionService;
    protected CachingService: CachingService;
    protected EntityCaptions: EntityCaptionsModel[] = [];
    public CaptionConstants: CaptionConstantsModel = new CaptionConstantsModel();
    constructor(
        protected Injector: Injector,
        protected Http: HttpClient,
        ) {
            this.SessionService = this.Injector.get(SessionService);
            this.CachingService = this.Injector.get(CachingService);
            let translateRefreshTimer = timer(0, 1000);
            translateRefreshTimer.subscribe((t : any) => {
                this.DebugTranslate();
            });
        };
        
        DebugTranslate() {
            this.EntityCaptions.forEach((entityCaptions: any) => {
                entityCaptions.Captions.forEach((caption: any) => {
                    var ext = "(" + this.SessionService.Session?.CurrentLanguage!.ISO639_1Code + ")";
                    var triedAlready = "[" + this.SessionService.Session?.CurrentLanguage!.ISO639_1Code + "]";
                    if (caption.DisplayName.indexOf(triedAlready) < 0 && this.SessionService.Session?.CurrentLanguage!.ISO639_1Code != "en" && caption.Language_ISO639_1Code != "en" && caption.DisplayName.indexOf(ext) > 0) {
                        var sourceLang = "en";
                        var targetLang = this.SessionService.Session?.CurrentLanguage!.ISO639_1Code;  
                        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(caption.DisplayName.replace(ext, ""));
                        this.Http.get(url)
                        .toPromise()
                        .then((response: any) => {
                            var rawData = response;                            
                            if (!rawData[0] || !rawData[0][0] || !rawData[0][0][0] || rawData[0][0][0] == caption.DisplayName) {
                                console.log("Unable to translate " + caption.DisplayName + " into " + this.SessionService.Session?.CurrentLanguage!.DisplayName);
                                caption.DisplayName = caption.DisplayName.replace(ext, triedAlready);
                                return;
                            }                        
                            caption.DisplayName = "";
                            for (var phrases = 0; phrases < rawData[0].length; ++phrases) {
                                caption.DisplayName += rawData[0][phrases][0];                            
                            }
                        })                        
                    }
                });
            });
        }
        
        DebugSetCaptions(entityName: string): EntityCaptionsModel {
            var entityCaptions = this.EntityCaptions.find((_entityCaptions: any) => { return _entityCaptions.Name == entityName; });
            if (!entityCaptions) {
                entityCaptions = new EntityCaptionsModel();
                entityCaptions.Name = entityName;
                entityCaptions.Captions = new Array<CaptionModel>();
                this.EntityCaptions.push(entityCaptions);
            }
            return entityCaptions;
        }
        
        DebugSetCaption(entityName: string, name: string, displayName: string): CaptionModel {
            var entityCaptions = this.EntityCaptions.find((_entityCaptions: any) => { return _entityCaptions.Name == entityName; });
            if (!entityCaptions) {
                entityCaptions = this.DebugSetCaptions(entityName);
            }
            var caption = entityCaptions.Captions.find((caption: any) => { return caption.Name == name && caption.LanguageID == this.SessionService.Session?.CurrentLanguage!.ID });
            if (!caption) {
                caption = new CaptionModel();
                caption.ID = (++this.CurrentID).toString();
                caption.Name = name;
                var ext = "";
                if (this.SessionService.Session?.CurrentLanguage?.ISO639_1Code != "en") {
                    ext = "(" + this.SessionService.Session?.CurrentLanguage!.ISO639_1Code + ")";
                }
                caption.DisplayName = displayName + ext;
                caption.LanguageID = this.SessionService.Session!.CurrentLanguage!.ID;
                caption.Language_ISO639_1Code = this.SessionService!.Session!.CurrentLanguage!.ISO639_1Code;
                caption.Language_ISO639_2Code = this.SessionService!.Session!.CurrentLanguage!.ISO639_2Code;
                entityCaptions.Captions.push(caption);
            }
            return caption;
        }
        
        GetNameFromDisplayName(displayName: string): string {
            var name = displayName.replace(/\s+/g, '').toLowerCase();
            if (name.length > 256) {
                throw "Localisation name length should not exceed 256. TODO:// And it must be in english";
            }
            return name;
        }
        
        GetCaptions(name: string): Promise<EntityCaptionsModel> {
            //TODO: Use HTML5 local storage service or any other CLOUD Session service, ensure that nothing sensitive is cached
            //let cachedEntityCaptions = this.CachingService.ReadCache("localisation." + name)
            //if (cachedEntityCaptions) {
            //    return Promise.resolve(cachedEntityCaptions);
            //}
            var me = this;
            return new Promise<EntityCaptionsModel>((resolve, reject) => {
                if (!name) {
                    reject("Entity name is null or undefined ");
                }
                var entityCaption = me.EntityCaptions.find((_entityCaption: any) => { return _entityCaption.Name == name; });
                if (!entityCaption) {
                    entityCaption = this.DebugSetCaptions(name);
                    if (!entityCaption) {
                        reject("No entity matching the name:(" + name + ") exists");
                    }
                }
                //TODO: Use HTML5 local stoage or any other CLOUD Session service
                //this.CachingService.UpdateCache("localisation." + name, entityCaption);
                resolve(entityCaption)
            });
        }
        
        GetCaption(entityName: string, name: string): Promise<CaptionModel> {
            var me = this;
            return new Promise<CaptionModel>((resolve, reject) => {
                if (!entityName) {
                    reject("Entity name is null or undefined for the caption named: " + name);
                }
                if (!name) {
                    reject("Name is null or undefined for the entity named: " + entityName);
                }
                me.GetCaptions(entityName).then(entityCaptions => {
                    var caption = entityCaptions.Captions.find((caption: any) => { return caption.Name == name; });
                    if (!caption) {
                        if (!caption) {
                            reject("No caption matching the name(" + name + ") exists");
                        }
                    }
                    resolve(caption!);
                });
            });
        }
        
        GetCaptionNow(entityName: string, name?: string , displayName?: string): string {
            //TODO: Use a NON-ASYNC HTML5 local storage service or any other CLOUD Session service, ensure that nothing sensitive is cached        
            if (!entityName) {
                throw "Entity name is null or undefined for the caption named: " + name;
            }
            if (!name) {
                if (!displayName) {                    
                    throw "No Display Name was provided for the caption named: " + name + " on the entity: " + entityName;
                }
                name = this.GetNameFromDisplayName(displayName);
            }
            if (!displayName) {
                throw "Display Name is null or undefined for the entity named: " + entityName + " andfor the caption named: " + name;
            }
            var me = this;
            var entityCaptions = this.EntityCaptions.find((_entityCaptions: any) => { return _entityCaptions.Name == entityName; });
            if (!entityCaptions) {
                //TODO: remove later
                entityCaptions = this.DebugSetCaptions(entityName);
            }
            var caption = entityCaptions.Captions.find((caption: any) => { return caption.Name == name && caption.LanguageID == this.SessionService.Session?.CurrentLanguage!.ID; });
            if (!caption) {
                //TODO: remove later
                caption = this.DebugSetCaption(entityName, name, displayName);
            }
            return caption.DisplayName;
        }
    }
    
    
    