import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { BrowseContentComponent } from './components/browse-content/browse-content.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    ContactModalComponent,
    BrowseContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
