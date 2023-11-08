import { Component, OnInit } from '@angular/core';
import { DocumentStep, IntesaDocumentType } from '@models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  currentDocumentStep: DocumentStep;
  documentSteps = DocumentStep;

  constructor(
    private _stepService: StepService,
    private _documentsService: DocumentsService
  ) {}

  get showSignStep() {
    return (
      this._documentsService.currentDocumentType ===
      IntesaDocumentType.FOR_SIGNING
    );
  }

  ngOnInit(): void {
    this._stepService.currentDocumentStep.subscribe(step => {
      this.currentDocumentStep = step;
    });
  }
}
