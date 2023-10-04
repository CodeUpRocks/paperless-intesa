import { Component, Input } from '@angular/core';
import { FutureStep } from '@models/steps.model';

@Component({
  selector: 'app-future-steps-wrapper',
  templateUrl: './future-steps-wrapper.component.html',
  styleUrls: ['./future-steps-wrapper.component.scss'],
})
export class FutureStepsWrapperComponent {
  @Input() steps: FutureStep[] = [];
}
