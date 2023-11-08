import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { DocumentStatus, IntesaDocumentType } from '@models/document.model';

@Component({
  selector: 'app-document-menu-item',
  templateUrl: './document-menu-item.component.html',
  styleUrls: ['./document-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentMenuItemComponent {
  @Input() name: string;
  @Input() type: IntesaDocumentType;
  @Input() status: DocumentStatus;

  @HostBinding('class.initial')
  @Input()
  disabled = false;

  @HostBinding('class.active')
  get active() {
    return this.status === DocumentStatus.VIEWING;
  }
}
