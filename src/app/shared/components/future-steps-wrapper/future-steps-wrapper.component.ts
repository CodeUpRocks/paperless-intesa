import { Component, Input } from '@angular/core';
import { DocumentStep } from '@models/document.model';
import { FutureStep } from '@models/steps.model';

@Component({
  selector: 'app-future-steps-wrapper',
  templateUrl: './future-steps-wrapper.component.html',
  styleUrls: ['./future-steps-wrapper.component.scss'],
})
export class FutureStepsWrapperComponent {
  @Input() steps: FutureStep[] = [];

  activeAccordion = -1;
  documentSteps = DocumentStep;

  setActiveAccordion(expanded: boolean, index: number) {
    this.activeAccordion = expanded ? index : -1;
  }
}
