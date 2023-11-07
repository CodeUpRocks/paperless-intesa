import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isEmpty } from '@shared/utils/string.utils';

@Component({
  selector: 'app-avatar',
  template: `{{ initials }}`,
  styles: [
    `
      :host {
        background-color: rgba(234, 96, 14, 0.38);
        width: 33px;
        height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-weight: 600;
        box-shadow: 0px 0px 20px 5px rgba(234, 96, 14, 0.27);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() fullName: string;

  get initials() {
    if (isEmpty(this.fullName)) {
      return '';
    }

    return this.fullName
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), '')
      .slice(0, 2)
      .toUpperCase();
  }
}
