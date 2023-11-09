import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  DocumentStatus,
  IntesaDocumentType,
  IntesaDocument,
  ProcessState,
  IntesaWizardStep,
  DocumentStep,
} from '@models/document.model';
import { User } from '@models/user.model';
import { SideNavToolbarComponent } from 'src/app/layouts/side-nav-toolbar/side-nav-toolbar.component';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

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

  @ViewChild(SideNavToolbarComponent) sidebar: SideNavToolbarComponent;

  currentStep: IntesaWizardStep;
  wizardStep = IntesaWizardStep;
  finalProcesState: ProcessState;
  finalProcesTitle: string;
  waitingStepTitle: string;
  iniitalStepType: IntesaDocumentType = IntesaDocumentType.FOR_REVIEW;
  currentDocument: IntesaDocument | undefined = undefined;

  constructor(
    private _documentsService: DocumentsService,
    private _stepService: StepService
  ) {}

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
    this.sidebar.collapseSidebar();
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

    const documentsForSigning = this.getDocumentsForSigning();
    const documentsForReview = this.getDocumentsForReview();

    switch (true) {
      case !!documentsForSigning.length &&
        documentsForSigning.some(
          document => document.documentStatus === DocumentStatus.QESRejected
        ):
        this.finalProcesTitle = 'DOŠLO JE DO GREŠKE PRILIKOM POTPISIVANJA!';
        this.finalProcesState = ProcessState.ERROR;
        this.currentStep = IntesaWizardStep.FINAL;
        this._stepService.currentDocumentStep.next(DocumentStep.FINAL);
        break;

      case !!documentsForReview.length &&
        !documentsForSigning.length &&
        documentsForReview.every(
          document => document.documentStatus === DocumentStatus.ACCEPTED
        ):
        this.finalProcesTitle = 'Pregled dokumenata uspešno završen!';
        this.finalProcesState = ProcessState.SUCCESS;
        this.currentStep = IntesaWizardStep.FINAL;
        this._stepService.currentDocumentStep.next(DocumentStep.FINAL);
        break;

      case !!documentsForSigning.length &&
        documentsForSigning.every(
          document => document.documentStatus === DocumentStatus.QESSigned
        ):
        this.finalProcesTitle = 'Potpisivanje uspešno završeno!';
        this.finalProcesState = ProcessState.SUCCESS;
        this.currentStep = IntesaWizardStep.FINAL;
        this._stepService.currentDocumentStep.next(DocumentStep.FINAL);
        break;

      case this.documents.some(
        document => document.documentStatus === DocumentStatus.CHANGE_REQUESTED
      ):
        this.waitingStepTitle = 'Molimo sačekajte izmenu';
        this.currentStep = IntesaWizardStep.WAITING;
        break;

      case !!documentsForSigning.length &&
        documentsForSigning.every(
          document => document.documentStatus === DocumentStatus.QESInitiated
        ):
        this.waitingStepTitle =
          'Molimo sačekajte potvrdu uspešnog potpisivanja';
        this.currentStep = IntesaWizardStep.WAITING;
        break;

      case (!documentsForReview.length ||
        (!!documentsForReview.length &&
          documentsForReview.every(
            document => document.documentStatus === DocumentStatus.ACCEPTED
          ))) &&
        (!documentsForSigning ||
          (!!documentsForSigning.length &&
            documentsForSigning.every(
              document =>
                document.documentStatus === DocumentStatus.QESRequested
            ))):
        this._stepService.currentDocumentStep.next(DocumentStep.SIGNING);
        this.currentStep = IntesaWizardStep.PREVIEW;
        break;

      case this.documents.some(
        document => document.documentStatus === DocumentStatus.VIEWING
      ):
        this.currentStep = IntesaWizardStep.REVIEW;
        break;

      default:
        !!documentsForReview.length &&
        documentsForReview.every(
          document => document.documentStatus == DocumentStatus.INITIAL
        )
          ? (this.iniitalStepType = IntesaDocumentType.FOR_REVIEW)
          : (this.iniitalStepType = IntesaDocumentType.FOR_SIGNING);
        this.currentStep = IntesaWizardStep.INITIAL;
        break;
    }
  }
}
