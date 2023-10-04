import { Component } from '@angular/core';
import { FutureStep } from '@models/steps.model';

@Component({
  selector: 'app-initial-step',
  templateUrl: './initial-step.component.html',
  styleUrls: ['./initial-step.component.scss'],
})
export class InitialStepComponent {
  futureSteps: FutureStep[] = [
    {
      title: 'Pregled dokumenta',
      imageUrl: 'assets/icons/review-step-icon.svg',
    },
    {
      title: 'Prihvatanje dokumenta',
      imageUrl: 'assets/icons/approve-step-icon.svg',
    },
    {
      title: 'Potpisivanje dokumenta',
      imageUrl: 'assets/icons/sign-step-icon.svg',
    },
  ];
}
