import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslationService } from '@app-core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCol,
  IonRow,
  IonCardContent,
  IonAvatar,
  IonText,
  IonCard,
  IonGrid,
} from '@ionic/angular/standalone';
import { SupportedLang } from '@models/language.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    IonGrid,
    IonCard,
    IonText,
    IonAvatar,
    IonCardContent,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    IonProgressBar,
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSelect,
    IonSelectOption,
    TranslateModule,
    IonItem,
    IonLabel,
    IonToggle,
  ],
})
export class SettingsPage {
  private ts = inject(TranslationService);

  currentLang = this.ts.getActiveLanguage();
  availableLangs = this.ts.getAvailableLanguages();
  isDark = localStorage.getItem('theme') === 'dark-theme';

  changeLang(lang: SupportedLang) {
    this.ts.setActiveLanguage(lang);
    this.currentLang = lang;
  }

  toggleDarkMode(event: any) {
    this.isDark = event.detail.checked;
    document.body.classList.toggle('dark-theme', this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark-theme' : 'light-theme');
  }
}
