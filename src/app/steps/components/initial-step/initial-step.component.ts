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
      imageUrl: 'assets/icons/review-step-icon.svg',
    },
    {
      title: 'Prihvatanje dokumenta',
      imageUrl: 'assets/icons/approve-step-icon.svg',
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
        imageUrl: 'assets/icons/sign-step-icon.svg',
      });
      this.title = 'Potrebno je da pregledate i prihvatite dokument u nastavku';
      this.text =
        'Potrebno je da pregledaš i prihvatiš dokument u nastavku. Nakon toga je neophodan i potpis. Biće ti ponuđena opcija za potpisivanje putem Consent ID aplikacije.';
    }
  }

  getStarted() {
    if (this.documents.length) {
      this._documentsService.goToNextDocument();
      this._stepService.goToNextProcessStep(ProcessSteps.REVIEWSTEP);
    }
  }
}
