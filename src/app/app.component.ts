import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'paperless-intesa';
  user = { name: 'Lola', surname: 'Ponorac', fullname: 'Lola Ponorac' };
}
