import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DocumentStatus, DocumentStep } from '@models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-review-step',
  templateUrl: './review-step.component.html',
  styleUrls: ['./review-step.component.scss'],
})
export class ReviewStepComponent implements OnInit {
  document: any;
  pdfSrc = '';
  fit = false;
  actionsDisabled = true;

  @Output() accepted = new EventEmitter<number | string>();
  @Output() changeRequested = new EventEmitter<number | string>();

  @ViewChild('pdfViewer') pdfViewer: ElementRef<HTMLDivElement>;

  constructor(
    private _stepService: StepService,
    private _documentsService: DocumentsService
  ) {}

  ngOnInit(): void {
    this._documentsService.getDocuments$().subscribe(data => {
      this.document = data.find(
        document => document.documentStatus === DocumentStatus.VIEWING
      );
      this.pdfSrc = this.document?.documentUrl;
      this.pdfViewer?.nativeElement?.scrollTo(0, 0);
    });
  }

  pageRendered() {
    this.fit = true;
  }

  onScroll() {
    this.actionsDisabled = false;
    this._stepService.currentDocumentStep.next(DocumentStep.ACCEPTANCE);
  }

  scrollToBottom() {
    this.pdfViewer?.nativeElement?.scrollTo({
      top: this.pdfViewer?.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onAccept() {
    this.accepted.emit(this.document.changesetID);

    this._stepService.currentDocumentStep.next(DocumentStep.REVIEW);

    // This will be moved to app component
    this._documentsService.updateDocumentStatus(
      !this.document?.clientQESRequired
        ? DocumentStatus.ACCEPTED
        : DocumentStatus.QESRequested
    );

    this.actionsDisabled = true;
  }

  onChange() {
    this.changeRequested.emit(this.document.changesetID);

    // This will be moved to app component
    this._documentsService.updateDocumentStatus(
      DocumentStatus.CHANGE_REQUESTED
    );
  }
}
