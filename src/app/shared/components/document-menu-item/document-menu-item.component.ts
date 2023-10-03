import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DocumentState } from '@enums/document.enums';

@Component({
  selector: 'app-document-menu-item',
  templateUrl: './document-menu-item.component.html',
  styleUrls: ['./document-menu-item.component.scss'],
})
export class DocumentMenuItemComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() name: string;
  @Input() state: DocumentState;

  @HostBinding('style.opacity')
  opacity: number = this.disabled ? 0.5 : 1;

  constructor() {}

  ngOnInit() {}
}
