import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import SuperTokens from 'supertokens-web-js';
import Passwordless from 'supertokens-web-js/recipe/passwordless';
import Session from 'supertokens-web-js/recipe/session';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

SuperTokens.init({
  appInfo: {
    appName: 'ST',
    apiDomain: 'https://charged-app.onrender.com',
    apiBasePath: '/auth',
  },
  recipeList: [
    Passwordless.init(),
    Session.init({
      tokenTransferMethod: 'cookie',
    }),
  ],
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    ...(TranslateModule.forRoot().providers ?? []),
  ],
});
