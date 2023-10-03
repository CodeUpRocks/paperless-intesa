import { Component, Input, OnInit } from '@angular/core';
import { Document, DocumentState } from '@models/document.model';
import { User } from '@models/user.model';

@Component({
  selector: 'app-side-nav-toolbar',
  templateUrl: './side-nav-toolbar.component.html',
  styleUrls: ['./side-nav-toolbar.component.scss'],
})
export class SideNavToolbarComponent implements OnInit {
  @Input() user: User;

  documentsForReview: Document[] = [];
  documentsToSigne: Document[] = [];

  ngOnInit(): void {
    this.documentsForReview = [
      { name: 'Dokument 1', state: DocumentState.REVIEW },
      { name: 'Long name Dokument', state: DocumentState.REVIEW },
      { name: 'Dokument 3', state: DocumentState.REVIEW },
    ];
    this.documentsToSigne = [
      { name: 'Dokument 1', state: DocumentState.SIGN },
      { name: 'Long name Dokument', state: DocumentState.SIGN },
      { name: 'Dokument 3', state: DocumentState.SIGN },
    ];
  }
}
