import { Component, Input } from '@angular/core';
import { DocumentState, DocumentType } from '@models/document.model';

const icons: Record<DocumentType, { [key in DocumentState]?: string }> = {
  [DocumentType.FOR_REVIEW]: {
    [DocumentState.INITIAL]: 'assets/icons/review-initial.svg',
    [DocumentState.COMPLETED]: 'assets/icons/review-completed.svg',
    [DocumentState.ACTIVE]: 'assets/icons/review-active.svg',
  },
  [DocumentType.FOR_SIGNING]: {
    [DocumentState.INITIAL]: 'assets/icons/sign-initial.svg',
    [DocumentState.COMPLETED]: 'assets/icons/sign-completed.svg',
    [DocumentState.ACTIVE]: 'assets/icons/sign-active.svg',
    [DocumentState.WAITING]: 'assets/icons/sign-waiting.svg',
    [DocumentState.ERROR]: 'assets/icons/document-error.svg',
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
export class DocumentStateIconComponent {
  @Input() state: DocumentState = DocumentState.INITIAL;
  @Input() type: DocumentType = DocumentType.FOR_REVIEW;
  @Input() active = false;

  get imageSrc() {
    return icons[this.type][this.active ? DocumentState.ACTIVE : this.state];
  }
}
