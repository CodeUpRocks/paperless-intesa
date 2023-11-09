import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string;
  @Input() pdfSrc = '';

  @Output() closeModal = new EventEmitter<any>();

  @ViewChild('pdfViewer') pdfViewer: ElementRef<HTMLDivElement>;

  isModalOpen = false;
  fit = false;

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
