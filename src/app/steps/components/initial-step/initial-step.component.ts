import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentType } from '@models/document.model';
import { FutureStep } from '@models/steps.model';
import {
  REVIEW_FUTURE_STEPS,
  SIGNING_FUTURE_STEP,
} from 'src/app/mocks/document.mock';

@Component({
  selector: 'app-initial-step',
  templateUrl: './initial-step.component.html',
  styleUrls: ['./initial-step.component.scss'],
})
export class InitialStepComponent implements OnInit {
  @Input() type: DocumentType;

  @Output() startProcess = new EventEmitter();

  futureSteps: FutureStep[] = REVIEW_FUTURE_STEPS;
  title = 'Potrebno je da pregledate i prihvatite dokument u nastavku';
  text = 'Potrebno je da pregledaš i prihvatiš dokumenta u nastavku.';

  ngOnInit(): void {
    if (this.type === DocumentType.FOR_SIGNING) {
      this.futureSteps.push(SIGNING_FUTURE_STEP);
      this.title =
        'Potrebno je da pregledate, prihvatite i potpišete dokument/a u nastavku';
      this.text =
        'Potrebno je da pregledaš i prihvatiš dokument/a u nastavku. Nakon toga, ukoliko je neophodan i potpis, što zavisi od tipa dokumenta, biće ti ponuđena opcija za potpisivanje putem Consent ID aplikacije.';
    }
  }

  getStarted() {
    this.startProcess.emit();
  }
}
