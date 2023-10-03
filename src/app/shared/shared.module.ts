import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { components } from './components';

@NgModule({
  imports: [BrowserModule],
  declarations: [...components],
  exports: [...components],
  providers: [],
})
export class SharedModule {}
