import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { Tick02Icon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, HugeiconsIconComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() items: string[] = [];
  Tick02Icon = Tick02Icon;
}
