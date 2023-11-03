import { Component, Input, OnInit } from '@angular/core';
import { ProcessState } from '@models/document.model';
import { StepService } from 'src/app/services/step.service';

const iconsUrl = {
  [ProcessState.ERROR]: 'assets/icons/error-icon.svg',
  [ProcessState.SUCCESS]: 'assets/icons/success-icon.svg',
};

@Component({
  selector: 'app-final-step',
  templateUrl: './final-step.component.html',
  styleUrls: ['./final-step.component.scss'],
})
export class FinalStepComponent implements OnInit {
  state: ProcessState;
  constructor(private _stepService: StepService) {}

  ngOnInit(): void {
    this._stepService.currentProcessState.subscribe(state => {
      this.state = state;
    });
  }

  get imageSrc() {
    return iconsUrl[this.state];
  }
  get title() {
    return this.state === ProcessState.SUCCESS
      ? 'Potpisivanje uspešno završeno!'
      : 'DOŠLO JE DO GREŠKE PRILIKOM POTPISIVANJA!';
  }
  get text() {
    return this.state === ProcessState.SUCCESS
      ? 'Dokument možete pronaći u mobilnoj aplikaciji na putanji Glavni meni - Moja dokumenta - Moji ugovori, ili, u svom email inboxu.'
      : 'Potpisivanje nije uspešno završeno preko tvoje Consent ID aplikacije (za sve ili pojedina dokumenta). Dogovori sa savetnikom dalje korake.';
  }
}
