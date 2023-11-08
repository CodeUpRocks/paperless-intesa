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
  IntesaDocumentType,
  IntesaDocument,
  ProcessState,
  IntesaWizardStep,
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
   * Emits event to start review or signing process
   */
  @Output() startProcess = new EventEmitter<void>();

  /**
   * Emits ID of a document for which change is requested
   */
  @Output() changeRequested = new EventEmitter<number | string>();

  /**
   * Emits an event that signature is requested
   */
  @Output() signatureRequested = new EventEmitter<void>();

  currentStep: IntesaWizardStep;
  wizardStep = IntesaWizardStep;
  finalProcesState: ProcessState;
  finalProcesTitle: string;
  waitingStepTitle: string;
  iniitalStepType: IntesaDocumentType = IntesaDocumentType.FOR_REVIEW;
  currentDocument: IntesaDocument | undefined = undefined;

  constructor(private _documentsService: DocumentsService) {}

  private isDocumentsChanged = (changes: SimpleChanges): boolean =>
    changes['documents']?.previousValue !== changes['documents']?.currentValue;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isDocumentsChanged(changes)) {
      this._documentsService.setDocuments(this.documents);
      this.currentDocument = this._documentsService.currentDocument;
      this.handleWizardSteps();
    }
  }

  handleStartProcess() {
    this.startProcess.emit();
  }

  getDocumentsForSigning() {
    return this.documents.filter(document => document.clientQESRequired);
  }

  getDocumentsForReview() {
    return this.documents.filter(document => !document.clientQESRequired);
  }

  private handleWizardSteps() {
    // NO DOCUMENTS SHOW MAYBE SOME MESSAGE TO A USER
    if (!this.documents.length) {
      return;
    }

    // CHECK IF ANY DOCUMENT IS CURRENTLY BEING VIEWED
    if (
      this.documents.some(
        document => document.documentStatus == DocumentStatus.VIEWING
      )
    ) {
      this.currentStep = IntesaWizardStep.REVIEW;
      return;
    }

    const documentsForSigning = this.getDocumentsForSigning();
    const documentsForReview = this.getDocumentsForReview();

    if (
      !!documentsForReview.length &&
      documentsForReview.every(
        document => document.documentStatus == DocumentStatus.INITIAL
      )
    ) {
      this.currentStep = IntesaWizardStep.INITIAL;
      this.iniitalStepType = IntesaDocumentType.FOR_REVIEW;
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
      this.currentStep = IntesaWizardStep.INITIAL;
      this.iniitalStepType = IntesaDocumentType.FOR_SIGNING;
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
        this.currentStep = IntesaWizardStep.FINAL;
      }
    } else {
      if (
        documentsForSigning.every(
          document => document.documentStatus === DocumentStatus.QESRequested
        )
      )
        this.currentStep = IntesaWizardStep.PREVIEW;
    }

    if (documentsForSigning.length > 0) {
      if (
        documentsForSigning.every(
          document => document.documentStatus == DocumentStatus.QESInitiated
        )
      ) {
        this.waitingStepTitle =
          'Molimo sačekajte potvrdu uspešnog potpisivanja';

        this.currentStep = IntesaWizardStep.WAITING;
      }

      if (
        documentsForSigning.some(
          document => document.documentStatus == DocumentStatus.CHANGE_REQUESTED
        )
      ) {
        this.waitingStepTitle = 'Molimo sačekajte izmenu';
        this.currentStep = IntesaWizardStep.WAITING;
      }
      if (
        documentsForSigning.some(
          document => document.documentStatus == DocumentStatus.QESRejected
        )
      ) {
        this.finalProcesTitle = 'DOŠLO JE DO GREŠKE PRILIKOM POTPISIVANJA!';

        this.finalProcesState = ProcessState.ERROR;
        this.currentStep = IntesaWizardStep.FINAL;
      }

      if (
        documentsForSigning.every(
          document => document.documentStatus == DocumentStatus.QESSigned
        )
      ) {
        this.finalProcesTitle = 'Potpisivanje uspešno završeno!';
        this.finalProcesState = ProcessState.SUCCESS;
        this.currentStep = IntesaWizardStep.FINAL;
      }
    }
  }
}
