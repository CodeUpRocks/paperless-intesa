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
  title = 'Potrebno je da pregledate i prihvatite dokument u nastavku';
  text =
    'Potrebno je da pregledaš i prihvatiš dokumentu nastavku. Nakon toga je neophodan i potpis. Biće ti ponuđena opcija za potpisivanje putem Consent ID aplikacije.';
}
