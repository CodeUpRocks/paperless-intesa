import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertisements-step',
  templateUrl: './advertisements-step.component.html',
  styleUrls: ['./advertisements-step.component.scss'],
})
export class AdvertisementStepComponent implements OnInit, OnDestroy {
  @Input() title = 'Molimo sačekajte';
  @Input() images: string[] = [];
  // [
  //   'https://images.unsplash.com/photo-1597431834637-9b1ec1df1b77?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTQ1MzEzOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1900',
  //   'https://images.pexels.com/photos/18022532/pexels-photo-18022532/free-photo-of-man-with-tattoos-on-body.jpeg',
  // ];

  currentIndex = 0;
  interval: any;

  getImage() {
    return `url(${this.images[this.currentIndex]})`;
  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      console.log('interval');
      const nextIndex = this.currentIndex + 1;
      this.currentIndex = this.images[nextIndex] ? nextIndex : 0;
    }, 1500);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
