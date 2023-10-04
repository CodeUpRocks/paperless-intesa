import { Component, Input, OnInit } from '@angular/core';
import { DocumentState, Document } from '@models/document.model';

@Component({
  selector: 'app-preview-sign-step',
  templateUrl: './preview-sign-step.component.html',
  styleUrls: ['./preview-sign-step.component.scss'],
})
export class PreviewSignStepComponent implements OnInit {
  @Input() documentsToSigne: Document[] = [];

  title = 'Potpiši dokument uz pomoć Consent ID aplikacije.';
  text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  ngOnInit(): void {
    this.documentsToSigne = [
      { name: 'Dokument 1', state: DocumentState.REVIEW },
      { name: 'Long name Dokument', state: DocumentState.REVIEW },
      { name: 'Dokument 3', state: DocumentState.REVIEW },
    ];
  }
}
