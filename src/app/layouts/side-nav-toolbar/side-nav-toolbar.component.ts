import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IntesaDocument } from '@models/document.model';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-side-nav-toolbar',
  templateUrl: './side-nav-toolbar.component.html',
  styleUrls: ['./side-nav-toolbar.component.scss'],
})
export class SideNavToolbarComponent implements OnInit {
  @Input() user: User;

  @HostBinding('class.collapsed')
  collapsed = false;

  documentsForReview$: Observable<IntesaDocument[]>;
  documentsForSigning$: Observable<IntesaDocument[]>;

  constructor(private _documentService: DocumentsService) {}

  ngOnInit(): void {
    this.documentsForReview$ = this._documentService.getDocumentsForReview$();

    this.documentsForSigning$ = this._documentService.getDocumentsForSign$();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
