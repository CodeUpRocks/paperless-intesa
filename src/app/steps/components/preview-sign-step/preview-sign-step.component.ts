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
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
