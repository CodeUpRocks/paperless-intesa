import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { isInRange } from '@shared/utils/number.utils';

@Directive({
  selector: '[appScrollTracker]',
})
export class ScrollTrackerDirective {
  @Output() scrolled = new EventEmitter<any>();

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // do tracking
    // Listen to click events in the component
    const tracker = event.target;
    let endReached = false;
    const limit = tracker.scrollHeight - tracker.clientHeight;
    const limitOffset = { min: limit - 2, max: limit + 2 };

    if (isInRange(event.target.scrollTop, limitOffset)) {
      endReached = true;

      this.scrolled.emit(endReached);
    }
  }
}
