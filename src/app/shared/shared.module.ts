import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { components } from './components';
import { directives } from './directives';

@NgModule({
  imports: [BrowserModule],
  declarations: [...components, ...directives],
  exports: [...components, ...directives],
  providers: [],
})
export class SharedModule {}
