import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advertisements-step',
  templateUrl: './advertisements-step.component.html',
  styleUrls: ['./advertisements-step.component.scss'],
})
export class AdvertisementStepComponent {
  @Input() title = 'Molimo sačekajte';
}
