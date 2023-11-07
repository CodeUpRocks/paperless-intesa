import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  DocumentStatus,
  DocumentType,
  IntesaDocument,
  ProcessState,
  ProcessSteps,
} from '@models/document.model';
import { User } from '@models/user.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './paperless-intesa-wizard.component.html',
  styleUrls: ['./paperless-intesa-wizard.component.scss'],
})
export class IntesaWizardComponent implements OnChanges {
  @Input() documents: IntesaDocument[] = [];
  @Input() user: User;

  /**
   * Emits ID of a document which is accepted
   */
  @Output() accepted = new EventEmitter<number | string>();

  /**
   * Emits event to start review process
   */
  @Output() startReview = new EventEmitter<void>();

  /**
   * Emits an event to start signing process
   */
  @Output() startSigning = new EventEmitter<void>();

  /**
   * Emits ID of a document for which change is requested
   */
  @Output() changeRequested = new EventEmitter<number | string>();

  /**
   * Emits an event that signature is requested
   */
  @Output() signatureRequested = new EventEmitter<void>();

  currentStep: ProcessSteps;
  steps = ProcessSteps;
  finalProcesState: ProcessState;
  finalProcesTitle: string;
  waitingStepTitle: string;
  iniitalStepType: DocumentType = DocumentType.FOR_REVIEW;

  constructor(private _documentsService: DocumentsService) {}

  private isDocumentsChanged = (changes: SimpleChanges): boolean =>
    changes['documents']?.previousValue !== changes['documents']?.currentValue;

  handleStartProcess() {
    this._documentsService.goToNextDocument();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isDocumentsChanged(changes)) {
      this.handleDocumentList([...this.documents]);
    }
  }

  private handleDocumentList(documents: IntesaDocument[]) {
    // NO DOCUMENTS SHOW MAYBE SOME MESSAGE TO A USER
    if (!documents.length) {
      return;
    }

    // CHECK IF ANY DOCUMENT IS CURRENTLY BEING VIEWED
    if (
      documents.some(
        document => document.documentStatus == DocumentStatus.VIEWING
      )
    ) {
      this.currentStep = ProcessSteps.REVIEWSTEP;
      const currentDocIndex = documents.findIndex(
        document => document.documentStatus == DocumentStatus.VIEWING
      );
      this._documentsService.setCurrentIndex(currentDocIndex);
      return;
    }

    const documentsForSigning = documents.filter(
      document => document.clientQESRequired
    );

    const documentsForReview = documents.filter(
      document => !document.clientQESRequired
    );

    if (
      !!documentsForReview.length &&
      documentsForReview.every(
        document => document.documentStatus == DocumentStatus.INITIAL
      )
    ) {
      this.currentStep = ProcessSteps.INITIALSTEP;
      this.iniitalStepType = DocumentType.FOR_REVIEW;
      return;
    }

    if (
      !documentsForReview.length ||
      (documentsForReview.every(
        document => document.documentStatus == DocumentStatus.ACCEPTED
      ) &&
        !!documentsForSigning.length &&
        documentsForSigning.every(
          document => document.documentStatus == DocumentStatus.INITIAL
        ))
    ) {
      this.currentStep = ProcessSteps.INITIALSTEP;
      this.iniitalStepType = DocumentType.FOR_SIGNING;
      return;
    }

    if (documentsForSigning.length === 0) {
      if (
        documentsForReview.every(
          document => document.documentStatus === DocumentStatus.ACCEPTED
        )
      ) {
        this.finalProcesState = ProcessState.SUCCESS;
        this.finalProcesTitle = 'Pregled dokumenata uspešno završen!';
        this.currentStep = ProcessSteps.FINALSTEP;
      }
    } else {
      if (
        documentsForSigning.every(
          document => document.documentStatus === DocumentStatus.QESRequested
        )
      )
        this.currentStep = ProcessSteps.PREVIEWSTEP;
    }

    if (documentsForSigning.length > 0) {
      if (
        documentsForSigning.every(
          document => document.documentStatus == DocumentStatus.QESInitiated
        )
      ) {
        this.waitingStepTitle =
          'Molimo sačekajte potvrdu uspešnog potpisivanja';

        this.currentStep = ProcessSteps.WAITING;
      }

      if (
        documentsForSigning.some(
          document => document.documentStatus == DocumentStatus.CHANGE_REQUESTED
        )
      ) {
        this.waitingStepTitle = 'Molimo sačekajte izmenu';
        this.currentStep = ProcessSteps.WAITING;
      }
      if (
        documentsForSigning.some(
          document => document.documentStatus == DocumentStatus.QESRejected
        )
      ) {
        this.finalProcesTitle = 'DOŠLO JE DO GREŠKE PRILIKOM POTPISIVANJA!';

        this.finalProcesState = ProcessState.ERROR;
        this.currentStep = ProcessSteps.FINALSTEP;
      }

      if (
        documentsForSigning.every(
          document => document.documentStatus == DocumentStatus.QESSigned
        )
      ) {
        this.finalProcesTitle = 'Potpisivanje uspešno završeno!';
        this.finalProcesState = ProcessState.SUCCESS;
        this.currentStep = ProcessSteps.FINALSTEP;
      }
    }
  }
}
