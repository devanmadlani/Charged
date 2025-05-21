import { Component, OnInit } from '@angular/core';
import {
  IonAccordion,
  IonAccordionGroup,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { ProgressRingComponent } from '@shared';

@Component({
  selector: 'app-scan-list-item',
  standalone: true,
  templateUrl: './scan-list-item.component.html',
  styleUrls: ['./scan-list-item.component.scss'],
  imports: [
    IonLabel,
    IonIcon,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    ProgressRingComponent,
  ],
})
export class ScanListItemComponent implements OnInit {
  data = [
    {
      label: 'Movement',
      icon: 'walk-outline',
      progress: 100,
      diff: 3,
      disabled: false,
    },
    {
      label: 'Nutrition',
      icon: 'restaurant-outline',
      progress: 64,
      diff: -2,
      disabled: false,
    },
    {
      label: 'Mindset',
      icon: 'happy-outline',
      progress: 100,
      diff: 3,
      disabled: false,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
