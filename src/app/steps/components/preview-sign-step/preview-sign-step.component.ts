import { Component, Input } from '@angular/core';
import { IntesaDocument } from '@models/document.model';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-preview-sign-step',
  templateUrl: './preview-sign-step.component.html',
  styleUrls: ['./preview-sign-step.component.scss'],
})
export class PreviewSignStepComponent {
  documentsForSigning$: Observable<IntesaDocument[]>;

  title = 'Potpiši dokument uz pomoć Consent ID aplikacije.';
  text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  constructor(private _documentsService: DocumentsService) {
    this.documentsForSigning$ =
      this._documentsService.getDocumentsForSigning$();
  }
}
