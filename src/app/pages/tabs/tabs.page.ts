import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  CheckListIcon,
  HomeIcon,
  Link04Icon,
  Route03Icon,
} from '@hugeicons/core-free-icons';
import {
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  template: ` <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="home" [routerLink]="['/tabs/home']">
        <hugeicons-icon
          [icon]="HomeIcon"
          [size]="24"
          color="currentColor"
          [strokeWidth]="1.5"
        ></hugeicons-icon>
        <ion-label>{{ 'TABS.SCAN' | translate }}</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="home1" [routerLink]="['/tabs/home']">
        <hugeicons-icon
          [icon]="Route03Icon"
          [size]="24"
          color="currentColor"
          [strokeWidth]="1.5"
        ></hugeicons-icon>
        <ion-label>{{ 'TABS.PLAN' | translate }}</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="home2" [routerLink]="['/tabs/home']">
        <hugeicons-icon
          [icon]="CheckListIcon"
          [size]="24"
          color="currentColor"
          [strokeWidth]="1.5"
        ></hugeicons-icon>
        <ion-label>{{ 'TABS.ACT' | translate }}</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="settings" [routerLink]="['/tabs/settings']">
        <hugeicons-icon
          [icon]="Link04Icon"
          [size]="24"
          color="currentColor"
          [strokeWidth]="1.5"
        ></hugeicons-icon>
        <ion-label>{{ 'TABS.CONNECT' | translate }}</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>`,
  standalone: true,
  imports: [
    CommonModule,
    IonTabButton,
    IonTabs,
    TranslateModule,
    IonLabel,
    IonTabBar,
    RouterModule,
    HugeiconsIconComponent,
  ],
})
export class TabsPage {
  HomeIcon = HomeIcon;
  Route03Icon = Route03Icon;
  CheckListIcon = CheckListIcon;
  Link04Icon = Link04Icon;
}
