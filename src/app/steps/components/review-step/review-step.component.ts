import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DocumentStep } from '@models/document.model';
import { StepService } from 'src/app/services/step.service';

@Component({
  selector: 'app-review-step',
  templateUrl: './review-step.component.html',
  styleUrls: ['./review-step.component.scss'],
})
export class ReviewStepComponent implements OnChanges {
  @Input() id: number | string;
  @Input() pdfSrc: string;
  @Input() changeButtonVisible: boolean;
  @Input() acceptButtonVisible: boolean;

  fit = false;
  actionsDisabled = true;

  @Output() accepted = new EventEmitter<number | string>();
  @Output() changeRequested = new EventEmitter<number | string>();

  @ViewChild('pdfViewer') pdfViewer: ElementRef<HTMLDivElement>;

  constructor(private _stepService: StepService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']?.previousValue !== changes['id']?.currentValue) {
      this.pdfViewer?.nativeElement?.scrollTo(0, 0);
    }
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
    this.accepted.emit(this.id);
    this.actionsDisabled = true;
    this._stepService.currentDocumentStep.next(DocumentStep.REVIEW);
  }

  onChange() {
    this.changeRequested.emit(this.id);
  }
}
