import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-future-step',
  templateUrl: './future-step.component.html',
  styleUrls: ['./future-step.component.scss'],
})
export class FutureStepComponent {
  @Input() title: string;
  @Input() imageUrl: string;
}
