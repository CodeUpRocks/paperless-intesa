import { Component, OnInit } from '@angular/core';
import { DocumentState, ProcessSteps } from '@models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-preview-sign-step',
  templateUrl: './preview-sign-step.component.html',
  styleUrls: ['./preview-sign-step.component.scss'],
})
export class PreviewSignStepComponent implements OnInit {
  documentsForSigning: any;
  isModalOpen = false;
  document: any;
  title = 'Potpiši dokument uz pomoć Consent ID aplikacije.';
  text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  constructor(
    private _documentsService: DocumentsService,
    private _stepService: StepService
  ) {}

  ngOnInit(): void {
    this._documentsService.getDocumentsForSign$().subscribe(data => {
      this.documentsForSigning = [...data];
    });
  }

  onAccept() {
    this._documentsService.acceptSignDocument(DocumentState.COMPLETED);
    this._stepService.goToNextProcessStep(ProcessSteps.WAITING);
  }

  onClick(event: any) {
    this.document = event;
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.document = {};
  }
}
