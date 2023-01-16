import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RootModule } from './app/CommonModules/RootModules/RootModule.ng';
/*
import { environment } from './environments/environment.prod';

debugger;
if (environment.production) {
  enableProdMode();
}
*/
enableProdMode();

platformBrowserDynamic().bootstrapModule(RootModule)
  .catch(err => console.log(err));
