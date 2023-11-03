import { Component, Input } from '@angular/core';
import { ProcessState } from '@models/document.model';

const iconsUrl = {
  [ProcessState.ERROR]: 'assets/icons/error.svg',
  [ProcessState.SUCCESS]: 'assets/icons/success-icon.svg',
};

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss'],
})
export class FinalStepComponent {
  @Input() state: ProcessState = ProcessState.SUCCESS;

  get imageSrc() {
    return iconsUrl[this.state];
  }
  get title() {
    return this.state === ProcessState.SUCCESS
      ? 'Potpisivanje uspešno završeno!'
      : 'Nešto nije u redu';
  }
  get text() {
    return this.state === ProcessState.SUCCESS
      ? 'Dokument možete pronaći u mobilnoj aplikaciji na putanji Glavni meni - Moja dokumenta - Moji ugovori, ili, u svom email inboxu.'
      : 'Potpisivanje nije uspešno završeno preko tvoje Consent ID aplikacije (za sve ili pojedina dokumenta). Dogovori sa savetnikom dalje korake.';
  }
}
