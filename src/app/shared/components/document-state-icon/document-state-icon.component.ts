import { Component, Input } from '@angular/core';
import { DocumentStatus, IntesaDocumentType } from '@models/document.model';

const icons: Record<IntesaDocumentType, { [key in DocumentStatus]?: string }> =
  {
    [IntesaDocumentType.FOR_REVIEW]: {
      [DocumentStatus.INITIAL]: 'assets/icons/review-initial.svg',
      [DocumentStatus.ACCEPTED]: 'assets/icons/review-completed.svg',
      [DocumentStatus.VIEWING]: 'assets/icons/review-active.svg',
    },
    [IntesaDocumentType.FOR_SIGNING]: {
      [DocumentStatus.INITIAL]: 'assets/icons/sign-initial.svg',
      [DocumentStatus.QESSigned]: 'assets/icons/sign-completed.svg',
      [DocumentStatus.VIEWING]: 'assets/icons/sign-active.svg',
      [DocumentStatus.QESRequested]: 'assets/icons/sign-waiting.svg',
      [DocumentStatus.QESRejected]: 'assets/icons/document-error.svg',
    },
  };

@Component({
  selector: 'app-document-state-icon',
  template: `<img class="icon" [src]="imageSrc" />`,
  styles: [
    `
      .icon {
        display: block;
        box-shadow: 2px 2px 9px 1px #3a3a3a1c;
        border-radius: 8px;
      }
    `,
  ],
})
export class DocumentStatusIconComponent {
  @Input() state: DocumentStatus = DocumentStatus.INITIAL;
  @Input() type: IntesaDocumentType;

  get imageSrc() {
    return icons[this.type][this.state];
  }
}
