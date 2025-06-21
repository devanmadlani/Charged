import { Component, OnInit, input, Input } from '@angular/core';

import { HugeiconsIconComponent, IconSvgObject } from '@hugeicons/angular';
import {
  CheckmarkCircle02Icon,
  Alert02Icon,
  InformationCircleIcon,
  SpamIcon,
  Megaphone02Icon,
} from '@hugeicons/core-free-icons';

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
  imports: [HugeiconsIconComponent],
})
export class NotificationComponent implements OnInit {
  @Input() heading?: string;
  @Input() subheading?: string;
  SuccessIcon = CheckmarkCircle02Icon;
  WarningIcon = Alert02Icon;
  InfoIcon = InformationCircleIcon;
  ErrorIcon = SpamIcon;
  CoachIcon = Megaphone02Icon;
  inline = input<boolean>(false);
  type = input<NotificationType>(NotificationType.Success);
  showAction = input<boolean>(true);

  constructor() {}

  ngOnInit() {}

  getIcon(): IconSvgObject {
    switch (this.type()) {
      case NotificationType.Warning:
        return this.WarningIcon;
      case NotificationType.Success:
        return this.SuccessIcon;
      case NotificationType.Info:
        return this.InfoIcon;
      case NotificationType.Error:
        return this.ErrorIcon;
      case NotificationType.Coach:
        return this.CoachIcon;
      default:
        return this.SuccessIcon;
    }
  }
}
