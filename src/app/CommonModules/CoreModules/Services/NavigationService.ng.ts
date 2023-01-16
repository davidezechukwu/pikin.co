import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import SuperPageModel from '../../SuperModules/Models/SuperPageModel';
import {SuperService}   from '../../SuperModules/Services/SuperService.ng';
import { PagesMock } from '../_MockModules/PageModelMockDataBuilder';


@Injectable()
export class NavigationService extends SuperService {
    constructor(protected Injector: Injector) {
        super(Injector);
    };    

    GetPageByName(pageName: string): Promise<SuperPageModel> {
        return new Promise((resolve, reject) => {
            var _page = _.find(PagesMock, function(__page) {
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
