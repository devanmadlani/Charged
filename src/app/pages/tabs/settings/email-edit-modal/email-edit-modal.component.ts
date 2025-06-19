import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { PencilEdit02Icon } from '@hugeicons/core-free-icons';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-email-edit-modal',
  standalone: true,
  templateUrl: './email-edit-modal.component.html',
  styleUrls: ['./email-edit-modal.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    HugeiconsIconComponent,
  ],
})
export class EmailEditModalComponent implements OnInit {
  email: string = '';
  private modalController = inject(ModalController);

  // Icons
  PencilEdit02Icon = PencilEdit02Icon;

  async ngOnInit() {
    // Get the current email from component props
    const modal = await this.modalController.getTop();
    this.email = (modal as any).componentProps?.currentEmail || '';
  }

  /**
   * Dismiss the modal without saving
   */
  dismiss() {
    this.modalController.dismiss();
  }

  /**
   * Save the email and dismiss modal
   */
  save() {
    if (this.email && this.isValidEmail(this.email)) {
      this.modalController.dismiss({
        email: this.email,
      });
    }
  }

  /**
   * Validate email format
   */
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
