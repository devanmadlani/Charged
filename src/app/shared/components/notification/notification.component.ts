import { Component, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class NotificationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
