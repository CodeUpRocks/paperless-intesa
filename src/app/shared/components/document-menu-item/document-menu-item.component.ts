import { Component, HostBinding, Input } from '@angular/core';
import { DocumentState } from '@models/document.model';

@Component({
  selector: 'app-document-menu-item',
  templateUrl: './document-menu-item.component.html',
  styleUrls: ['./document-menu-item.component.scss'],
})
export class DocumentMenuItemComponent {
  @Input() disabled = false;
  @Input() name: string;
  @Input() state: DocumentState;

  @HostBinding('style.opacity')
  opacity: number = this.disabled ? 0.5 : 1;
}
