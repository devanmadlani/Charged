import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslationService } from '@app-core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonButton,
  IonList,
  IonListHeader,
  ModalController,
  AlertController,
} from '@ionic/angular/standalone';
import { SupportedLang } from '@models/language.model';
import { TranslateModule } from '@ngx-translate/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import {
  ArrowRight01Icon,
  LinkSquare02Icon,
  Logout01Icon,
  PencilEdit02Icon,
} from '@hugeicons/core-free-icons';
import { EmailEditModalComponent } from './email-edit-modal/email-edit-modal.component';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonToggle,
    IonButton,
    IonList,
    IonListHeader,
    HugeiconsIconComponent,
    TranslateModule,
  ],
})
export class SettingsPage {
  private ts = inject(TranslationService);
  private modalController = inject(ModalController);
  private alertController = inject(AlertController);

  currentLang = this.ts.getActiveLanguage();
  availableLangs = this.ts.getAvailableLanguages();
  isDark = localStorage.getItem('theme') === 'dark-theme';

  userName = 'Devan';
  userEmail = 'madlanidevan@gmail.com';

  PencilEdit02Icon = PencilEdit02Icon;
  LinkSquare02Icon = LinkSquare02Icon;
  ArrowRight01Icon = ArrowRight01Icon;
  Logout01Icon = Logout01Icon;

  changeLang(lang: SupportedLang) {
    this.ts.setActiveLanguage(lang);
    this.currentLang = lang;
  }

  toggleDarkMode(event: any) {
    this.isDark = event.detail.checked;
    document.body.classList.toggle('dark-theme', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark-theme' : 'light-theme');
  }

  async openEmailEditModal() {
    const modal = await this.modalController.create({
      component: EmailEditModalComponent,
      componentProps: {
        currentEmail: this.userEmail,
      },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
      handle: true,
      canDismiss: true,
      showBackdrop: true,
      backdropDismiss: true,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.email) {
        this.userEmail = result.data.email;
      }
    });

    return await modal.present();
  }

  openWhatsApp() {
    window.open('https://wa.me/123455', '_blank');
  }

  openPrivacyPolicy() {
    window.open('https://test.com', '_blank');
  }

  openTermsAndConditions() {
    window.open('https://test.com', '_blank');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Log out',
      message: 'Are you sure you want to log out of this device?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Log out',
          handler: () => {
            console.log('Logging out...');
          },
        },
      ],
    });

    await alert.present();
  }
}
