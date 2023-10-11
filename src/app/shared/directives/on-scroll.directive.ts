import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]',
})
export class ScrollTrackerDirective {
  @Output() scrolled = new EventEmitter<any>();

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // do tracking
    // console.log('scrolled', event.target.scrollTop);
    // Listen to click events in the component
    const tracker = event.target;
    let endReached = false;
    const limit = tracker.scrollHeight - tracker.clientHeight;

    // console.log(event.target.scrollTop, limit);
    if (event.target.scrollTop === limit) {
      endReached = true;

      this.scrolled.emit(endReached);
    }
  }
}
