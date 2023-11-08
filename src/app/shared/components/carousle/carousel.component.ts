import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() slides: string[];
  currentSlide = 0;
  interval: any;

  ngOnInit(): void {
    this.interval = setInterval(() => {
      const nextIndex = this.currentSlide + 1;
      this.currentSlide = this.slides[nextIndex] ? nextIndex : 0;
    }, 2000);
  }

  getImage() {
    return `url(${this.slides[this.currentSlide]})`;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
