import { Injectable } from '@angular/core';
import { DocumentStep } from '@models/document.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StepService {
  currentDocumentStep = new BehaviorSubject<DocumentStep>(DocumentStep.REVIEW);
}
