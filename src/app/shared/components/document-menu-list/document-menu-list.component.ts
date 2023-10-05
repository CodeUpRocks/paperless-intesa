import { Component, Input } from '@angular/core';
import { IntesaDocument } from '@models/document.model';

@Component({
  selector: 'app-document-menu-list',
  templateUrl: './document-menu-list.component.html',
  styleUrls: ['./document-menu-list.component.scss'],
})
export class DocumentMenuListComponent {
  @Input() title: string;
  @Input() documents: IntesaDocument[];
}
