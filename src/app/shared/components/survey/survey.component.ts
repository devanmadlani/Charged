import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { TypeformService } from '@app-core';
import { createWidget } from '@typeform/embed';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements AfterViewInit {
  formId = input.required<string>();
  userId = input<string>();
  typeformContainerRef = viewChild<ElementRef>('typeformContainer');
  // TODO: set correct type
  submittedAnswers: any;

  private typeformService = inject(TypeformService);

  ngAfterViewInit(): void {
    this.loadSurvey();
  }

  private loadSurvey(): void {
    const formId = this.formId();
    const userId = this.userId?.();
    const containerEl = this.typeformContainerRef();

    if (!formId || !containerEl) {
      console.warn('Missing form ID or container element');
      return;
    }

    createWidget(formId, {
      container: containerEl.nativeElement,
      onSubmit: () => {
        console.log('Typeform submitted!');

        if (userId) {
          this.typeformService.getSubmittedResponse(userId).subscribe({
            next: (data) => {
              console.log('Received data from backend:', data);
              this.submittedAnswers = data;
            },
            error: (err) => {
              console.error('Failed to fetch response:', err);
            },
          });
        }
      },
      hidden: userId ? { userId } : undefined,
      hideHeaders: true,
      hideFooter: true,
      opacity: 100,
      transitiveSearchParams: true,
      autoResize: true,
    });
    setTimeout(() => {
      const iframe = containerEl.nativeElement.querySelector('iframe');
      if (iframe) {
        iframe.style.height = '60vh';
        iframe.style.width = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
      } else {
        console.warn('iframe not found for post-style patching');
      }
    });
  }
}
