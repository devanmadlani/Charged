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
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { addIcons } from 'ionicons';
import {
  heartOutline,
  settingsOutline,
  homeOutline,
  personOutline,
  calendarOutline,
  checkmarkOutline,
  arrowBackOutline,
  checkmarkCircleOutline,
  home,
  settings,
  person,
  chevronForwardOutline,
  lockClosedOutline,
} from 'ionicons/icons';

addIcons({
  'heart-outline': heartOutline,
  'settings-outline': settingsOutline,
  'home-outline': homeOutline,
  'person-outline': personOutline,
  'calendar-outline': calendarOutline,
  'checkmark-outline': checkmarkOutline,
  'arrow-back-outline': arrowBackOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  home: home,
  settings: settings,
  person: person,
  'chevron-forward-outline': chevronForwardOutline,
  'lock-closed-outline': lockClosedOutline,
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
