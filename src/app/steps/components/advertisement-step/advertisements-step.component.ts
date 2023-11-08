import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advertisements-step',
  templateUrl: './advertisements-step.component.html',
  styleUrls: ['./advertisements-step.component.scss'],
})
export class AdvertisementStepComponent {
  @Input() title = 'Molimo sačekajte';
  @Input() images: string[] = [];
  // [
  //   'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //   'https://images.pexels.com/photos/18022532/pexels-photo-18022532/free-photo-of-man-with-tattoos-on-body.jpeg',
  //   'https://images.pexels.com/photos/1556691/pexels-photo-1556691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  // ];
}
