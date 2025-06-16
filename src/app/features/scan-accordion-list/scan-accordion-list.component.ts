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
  selector: 'app-scan-accordion-list',
  standalone: true,
  templateUrl: './scan-accordion-list.component.html',
  styleUrls: ['./scan-accordion-list.component.scss'],
  imports: [
    IonLabel,
    IonIcon,
    IonItem,
    IonAccordion,
    IonAccordionGroup,
    ProgressRingComponent,
  ],
})
export class ScanAccordionListComponent implements OnInit {
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
