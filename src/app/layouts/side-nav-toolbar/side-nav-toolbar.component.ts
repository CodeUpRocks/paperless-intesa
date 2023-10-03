import { Component, Input, OnInit } from '@angular/core';
import { DocumentState } from '@enums/document.enums';

@Component({
  selector: 'app-side-nav-toolbar',
  templateUrl: './side-nav-toolbar.component.html',
  styleUrls: ['./side-nav-toolbar.component.scss'],
})
export class SideNavToolbarComponent implements OnInit {
  @Input() user: any;

  documentsForReview: any[] = [];
  documentsToSigne: any[] = [];

  ngOnInit(): void {
    this.documentsForReview = [
      { name: 'Dokument 1', status: DocumentState.REVIEW },
      { name: 'Long name Dokument', status: DocumentState.REVIEW },
      { name: 'Dokument 3', status: DocumentState.REVIEW },
    ];
    this.documentsToSigne = [
      { name: 'Dokument 1', status: DocumentState.SIGN },
      { name: 'Long name Dokument', status: DocumentState.SIGN },
      { name: 'Dokument 3', status: DocumentState.SIGN },
    ];
  }
}
