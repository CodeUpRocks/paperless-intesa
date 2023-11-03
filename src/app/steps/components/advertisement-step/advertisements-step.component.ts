import { Component, Input, OnInit } from '@angular/core';
import { ProcessState, ProcessSteps } from '@models/document.model';
import { hasChangings } from '@shared/utils/document.utils';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-advertisements-step',
  templateUrl: './advertisements-step.component.html',
  styleUrls: ['./advertisements-step.component.scss'],
})
export class AdvertisementStepComponent implements OnInit {
  title = 'Molimo sačekajte potvdu uspešnog potpisivanja';
  hasChangings = false;

  constructor(
    private _stepService: StepService,
    private _documentsService: DocumentsService
  ) {}
  ngOnInit(): void {
    this.hasChangings = hasChangings(
      this._documentsService.getDocumentsValue()
    );
    if (this.hasChangings) {
      this.title = 'Molimo sačekajte izmenu';
    }

    setTimeout(() => {
      if (this.hasChangings) {
        location.reload();
      } else {
        // this._documentsService.errorOcured();
        // this._stepService.currentProcessState.next(ProcessState.ERROR); ///error
        this._stepService.currentProcessState.next(ProcessState.SUCCESS); ///success
        this._stepService.goToNextProcessStep(ProcessSteps.FINALSTEP);
      }
    }, 3000);
  }
}
