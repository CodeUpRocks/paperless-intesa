import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: '83px' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AccordionComponent {
  @Input() title = '';
  @Input() orderNumber: number;
  @Input() expanded = false;

  @Output() toggle = new EventEmitter<boolean>();

  toggleAccordion() {
    this.expanded = !this.expanded;
    this.toggle.emit(this.expanded);
  }
}
