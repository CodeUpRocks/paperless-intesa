import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  DocumentState,
  DocumentStep,
  DocumentType,
  IntesaDocument,
  ProcessSteps,
} from '@models/document.model';
import { hasSigns } from '@shared/utils/document.utils';
import { Subject, takeUntil } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-review-step',
  templateUrl: './review-step.component.html',
  styleUrls: ['./review-step.component.scss'],
})
export class ReviewStepComponent implements OnInit, OnDestroy {
  document: IntesaDocument;
  documents = this._documentsService.getDocumentsValue();
  pdfSrc: any = '';
  fit = false;
  actionsDisabled = true;
  destroy$ = new Subject();
  @ViewChild('pdfViewer') pdfViewer: ElementRef<HTMLDivElement>;

  constructor(
    private _stepService: StepService,
    private _documentsService: DocumentsService
  ) {}

  ngOnInit(): void {
    this._documentsService
      .getCurrentDocumentObservable$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(document => {
        this.document = document;
        this.pdfSrc = document?.documentUrl;
        this.pdfViewer?.nativeElement?.scrollTo(0, 0);
        if (!document) {
          this.goToNextStep();
        }
      });
  }

  pageRendered(event: any) {
    this.fit = true;
  }

  onScroll(event: any) {
    this.actionsDisabled = false;
    this._stepService.currentDocumentStep.next(DocumentStep.ACCEPTANCE);
  }

  onAccept() {
    this._stepService.currentDocumentStep.next(DocumentStep.REVIEW);
    this._documentsService.updateDocumentStatus(
      this.document?.type === DocumentType.FOR_REVIEW
        ? DocumentState.COMPLETED
        : DocumentState.WAITING
    );
    this.actionsDisabled = true;
  }

  onChange() {
    this._documentsService.updateDocumentStatus(DocumentState.CHANGING);
    this._stepService.goToNextProcessStep(ProcessSteps.WAITING);
  }

  goToNextStep() {
    this._stepService.goToNextProcessStep(
      hasSigns(this.documents)
        ? ProcessSteps.PREVIEWSTEP
        : ProcessSteps.FINALSTEP
    );
    this._stepService.currentDocumentStep.next(DocumentStep.SIGNING);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
