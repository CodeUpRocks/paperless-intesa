import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DocumentStatus, IntesaDocument } from '@models/document.model';
import { User } from '@models/user.model';
import { Observable, map } from 'rxjs';
import { DocumentsService } from 'src/app/services/documents.service';

type DocumentsListViewModel = {
  documents: IntesaDocument[];
  documentsLeft: number;
};

@Component({
  selector: 'app-side-nav-toolbar',
  templateUrl: './side-nav-toolbar.component.html',
  styleUrls: ['./side-nav-toolbar.component.scss'],
})
export class SideNavToolbarComponent implements OnInit {
  @Input() user: User;

  @HostBinding('class.collapsed')
  collapsed = false;

  documentsForReviewVM$: Observable<DocumentsListViewModel>;
  documentsForSigningVM$: Observable<DocumentsListViewModel>;

  constructor(private _documentService: DocumentsService) {}

  ngOnInit(): void {
    this.initForReviewVM();
    this.initForSigningVM();
  }

  collapseSidebar() {
    this.collapsed = true;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  private initForReviewVM() {
    this.documentsForReviewVM$ = this._documentService
      .getDocumentsForReview$()
      .pipe(
        map(forReview => ({
          documents: forReview,
          documentsLeft: this.calculateDocumentsLeft(
            forReview,
            DocumentStatus.ACCEPTED
          ),
        }))
      );
  }

  private initForSigningVM() {
    this.documentsForSigningVM$ = this._documentService
      .getDocumentsForSign$()
      .pipe(
        map(forSigning => ({
          documents: forSigning,
          documentsLeft: this.calculateDocumentsLeft(
            forSigning,
            DocumentStatus.QESSigned
          ),
        }))
      );
  }

  private calculateDocumentsLeft(
    documents: IntesaDocument[],
    status: DocumentStatus
  ) {
    return documents.reduce((total, current) => {
      if (current.documentStatus !== status) {
        total++;
      }

      return total;
    }, 0);
  }
}
