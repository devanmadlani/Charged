import { Component, OnInit, input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  checkmarkCircleOutline,
  informationCircleOutline,
  alertCircleOutline,
  megaphoneOutline,
} from 'ionicons/icons';

addIcons({
  'warning-outline': warningOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'information-circle-outline': informationCircleOutline,
  'alert-circle-outline': alertCircleOutline,
  'megaphone-outline': megaphoneOutline,
});

export enum NotificationType {
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
  Error = 'error',
  Coach = 'coach',
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class NotificationComponent implements OnInit {
  inline = input<boolean>(false);
  type = input<NotificationType>(NotificationType.Success);
  showAction = input<boolean>(true);

  constructor() {}

  ngOnInit() {}

  getIconName(): string {
    switch (this.type()) {
      case NotificationType.Warning:
        return 'warning-outline';
      case NotificationType.Success:
        return 'checkmark-circle-outline';
      case NotificationType.Info:
        return 'information-circle-outline';
      case NotificationType.Error:
        return 'alert-circle-outline';
      case NotificationType.Coach:
        return 'megaphone-outline';
      default:
        return 'checkmark-circle-outline';
    }
  }
}
