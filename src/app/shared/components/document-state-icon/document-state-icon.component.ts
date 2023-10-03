import { Component, Input, OnInit } from '@angular/core';
import { DocumentState } from '@enums/document.enums';

const iconsUrl = {
  [DocumentState.REVIEW]: 'assets/icons/document-review.svg',
  [DocumentState.SIGN]: 'assets/icons/document-sign.svg',
  [DocumentState.ERROR]: 'assets/icons/document-error.svg',
  [DocumentState.COMPLETED]: 'assets/icons/document-completed.svg',
  [DocumentState.WAITING]: 'assets/icons/document-waiting.svg',
};

@Component({
  selector: 'app-document-state-icon',
  template: `<img style="display: block;" class="icon" [src]="imageSrc" />`,
})
export class DocumentStateIconComponent implements OnInit {
  @Input() state: DocumentState = DocumentState.WAITING;

  get imageSrc() {
    return iconsUrl[this.state];
  }

  ngOnInit(): void {}
}
