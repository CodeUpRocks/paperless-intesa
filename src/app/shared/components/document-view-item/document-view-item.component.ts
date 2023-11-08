import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-document-view-item',
  templateUrl: './document-view-item.component.html',
  styleUrls: ['./document-view-item.component.scss'],
})
export class DocumentViewItemComponent {
  @Input() name = '';

  @Output() openDocument = new EventEmitter<void>();
}
