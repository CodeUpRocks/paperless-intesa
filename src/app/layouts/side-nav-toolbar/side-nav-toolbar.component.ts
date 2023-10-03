import { Component, Input, OnInit } from '@angular/core';

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
      { documentName: 'document 1', status: 'reviewed', error: null },
      { documentName: 'document 2', status: 'not reviewed', error: null },
      { documentName: 'document 3', status: 'error', error: null },
    ];
    this.documentsToSigne = [
      { documentName: 'document 1', status: 'not reviewed', error: null },
      { documentName: 'document 2', status: 'not reviewed', error: null },
    ];
  }
}
