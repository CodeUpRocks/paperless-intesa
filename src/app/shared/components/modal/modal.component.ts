import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IntesaDocument } from '@models/document.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() document: IntesaDocument;
  @Output() closeModal = new EventEmitter<any>();
  isModalOpen = false;
  fit = false;
  pdfSrc: any = '';
  @ViewChild('pdfViewer') pdfViewer: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.pdfSrc = this.document.documentUrl;
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }

  pageRendered(event: any) {
    this.fit = true;
  }

  scrollToBottom() {
    this.pdfViewer?.nativeElement?.scrollTo({
      top: this.pdfViewer?.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }
}
