import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IntesaDocument } from '@models/document.model';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-preview-sign-step',
  templateUrl: './preview-sign-step.component.html',
  styleUrls: ['./preview-sign-step.component.scss'],
})
export class PreviewSignStepComponent implements OnInit {
  documentsForSigning$: Observable<IntesaDocument[]>;
  isModalOpen = false;
  document: IntesaDocument | null = null;
  title = 'Potpiši dokument uz pomoć Consent ID aplikacije.';
  text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  @Output() signatureRequested = new EventEmitter<void>();

  constructor(private _documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.documentsForSigning$ = this._documentsService.getDocumentsForSign$();
  }

  onSignDocuments() {
    this.signatureRequested.emit();
  }

  openDocumentModal(document: IntesaDocument) {
    this.document = document;
    this.isModalOpen = true;
  }

  closeDocumentModal() {
    this.isModalOpen = false;
    this.document = null;
  }
}
