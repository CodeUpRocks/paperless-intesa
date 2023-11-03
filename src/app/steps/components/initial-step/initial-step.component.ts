import { Component, OnInit } from '@angular/core';
import { IntesaDocument, ProcessSteps } from '@models/document.model';
import { FutureStep } from '@models/steps.model';
import { hasReviews, hasSigns } from '@shared/utils/document.utils';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-initial-step',
  templateUrl: './initial-step.component.html',
  styleUrls: ['./initial-step.component.scss'],
})
export class InitialStepComponent implements OnInit {
  hasReviewDocuments = false;
  hasSignDocuments = false;
  documents: IntesaDocument[];
  constructor(
    private _stepService: StepService,
    private _documentsService: DocumentsService
  ) {}

  futureSteps: FutureStep[] = [
    {
      title: 'Pregled dokumenta',
      // imageUrl: 'assets/icons/pregled-dokumenta-icon.svg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      title: 'Prihvatanje dokumenta',
      // imageUrl: 'assets/icons/prihvatanje-dokumenta-icon.svg',
      description: '',
    },
  ];
  title = 'Potrebno je da pregledate i prihvatite dokument u nastavku';
  text = 'Potrebno je da pregledaš i prihvatiš dokumenta u nastavku.';

  ngOnInit(): void {
    this.documents = this._documentsService.getDocumentsValue();
    this.hasReviewDocuments = hasReviews(this.documents);
    this.hasSignDocuments = hasSigns(this.documents);

    if (this.hasSignDocuments) {
      this.futureSteps.push({
        title: 'Potpisivanje dokumenta',
        // imageUrl: 'assets/icons/potpisivanje-dokumenta-icon.svg',
        description: '',
      });
      this.title =
        'Potrebno je da pregledate, prihvatite i potpišete dokument/a u nastavku';
      this.text =
        'Potrebno je da pregledaš i prihvatiš dokument/a u nastavku. Nakon toga, ukoliko je neophodan i potpis, što zavisi od tipa dokumenta, biće ti ponuđena opcija za potpisivanje putem Consent ID aplikacije.';
    }
  }

  getStarted() {
    if (this.documents.length) {
      this._documentsService.goToNextDocument();
      this._stepService.goToNextProcessStep(ProcessSteps.REVIEWSTEP);
    }
  }
}
