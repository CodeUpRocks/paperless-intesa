import { Component, HostBinding, Input } from '@angular/core';
import { IntesaDocument } from '@models/document.model';

@Component({
  selector: 'app-document-menu-item',
  templateUrl: './document-menu-item.component.html',
  styleUrls: ['./document-menu-item.component.scss'],
})
export class DocumentMenuItemComponent {
  @Input() document: IntesaDocument;

  @HostBinding('class.initial')
  @Input()
  disabled = false;
}
