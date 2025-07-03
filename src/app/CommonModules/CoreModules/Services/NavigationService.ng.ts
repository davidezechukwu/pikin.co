import { Injectable, Injector } from '@angular/core';
import { SuperPageModel } from '../../SuperModules/Models/SuperPageModel';
import { SuperService }   from '../../SuperModules/Services/SuperService.ng';
import { PagesMock } from '../_MockModules/PageModelMockDataBuilder';


@Injectable()
export class NavigationService extends SuperService {
    constructor(injector: Injector) {
        super(injector);
    };    

    GetPageByName(pageName: string): Promise<SuperPageModel> {
        if ( pageName.startsWith('_') ){
            pageName = pageName.substring(1);
        }
        return new Promise((resolve, reject) => {            
            var _page = PagesMock.find(function(__page: any) {
                return __page.PageName == pageName;
            });
            if (_page) {
                resolve(_page);
            }
            else {
                reject("Page is not found");
            }
        });        
    }
}
