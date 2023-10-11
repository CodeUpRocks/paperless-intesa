import { Component, OnInit } from '@angular/core';
import { DocumentStep } from '@models/document.model';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
  currentDocumentStep: DocumentStep;
  documentSteps = DocumentStep;
  constructor(private _stepService: StepService) {}

  ngOnInit(): void {
    this._stepService.currentDocumentStep.subscribe(step => {
      this.currentDocumentStep = step;
    });
  }
}
