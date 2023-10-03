import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-menu-list',
  templateUrl: './document-menu-list.component.html',
  styleUrls: ['./document-menu-list.component.scss'],
})
export class DocumentMenuListComponent implements OnInit {
  @Input() title: string;
  @Input() documents: any[];

  constructor() {}

  ngOnInit() {}
}
