import { Component } from '@angular/core';

@Component({
  selector: 'app-divider',
  template: `<div class="divider"></div>`,
  styles: [
    `
      .divider {
        margin: 0 auto;
        height: 5px;
        width: 100%;
        max-width: 195px;
        background-color: #ea600e;
        margin-bottom: 30px;
      }
    `,
  ],
})
export class DividerComponent {}
