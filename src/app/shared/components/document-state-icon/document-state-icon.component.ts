import { Component, Input } from '@angular/core';
import { DocumentState, DocumentType } from '@models/document.model';

const iconUrlByType = {
  [DocumentType.FOR_REVIEW]: 'assets/icons/document-review.svg',
  [DocumentType.FOR_SIGNING]: 'assets/icons/document-sign.svg',
};

const iconUrlByState = {
  [DocumentState.ERROR]: 'assets/icons/document-error.svg',
  [DocumentState.COMPLETED]: 'assets/icons/document-completed.svg',
  [DocumentState.WAITING]: 'assets/icons/document-waiting.svg',
};

@Component({
  selector: 'app-document-state-icon',
  template: `<img style="display: block;" class="icon" [src]="imageSrc" />`,
})
export class DocumentStateIconComponent {
  @Input() state: DocumentState = DocumentState.INITIAL;
  @Input() type: DocumentType = DocumentType.FOR_REVIEW;

  get imageSrc() {
    if (this.state === DocumentState.INITIAL) {
      return iconUrlByType[this.type];
    }

    return iconUrlByState[this.state];
  }
}
