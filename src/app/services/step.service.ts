import { Injectable } from '@angular/core';
import { DocumentStep, ProcessSteps } from '@models/document.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StepService {
  public currentProcessStep: BehaviorSubject<ProcessSteps> =
    new BehaviorSubject<ProcessSteps>(ProcessSteps.INITIALSTEP);

  public currentDocumentStep: BehaviorSubject<DocumentStep> =
    new BehaviorSubject<DocumentStep>(DocumentStep.REVIEW);

  goToNextProcessStep(nextStep: ProcessSteps) {
    this.currentProcessStep.next(nextStep);
  }
}
