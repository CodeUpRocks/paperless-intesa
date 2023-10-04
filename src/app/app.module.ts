import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { components } from '@steps/components';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavToolbarComponent } from './layouts/side-nav-toolbar/side-nav-toolbar.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AppComponent, SideNavToolbarComponent, ...components],
  imports: [BrowserModule, SharedModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
