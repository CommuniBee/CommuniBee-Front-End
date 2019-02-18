import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgArrayPipesModule } from 'angular-pipes';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { BrowseContentComponent } from './components/browse-content/browse-content.component';
import { BrowseOpportunitiesComponent } from './components/browse-opportunities/browse-opportunities.component';
import { BrowseVolunteersComponent } from './components/browse-volunteers/browse-volunteers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddVolunteeringOpportunityComponent } from './components/add-volunteering-opportunity/add-volunteering-opportunity.component';
import { AddVolunteersComponent } from './components/add-volunteers/add-volunteers.component';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { AuthService } from './services/communibee-backend/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddContentComponent } from './components/add-content/add-content.component';
import { MatchComponent } from './components/match/match.component';
import { StyleContactPipe } from './pipes/style-contact.pipe';
import { WeekdayNamesPipe } from './pipes/weekday-names.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import {DashboardTabsComponent} from './components/dashboard-tabs/dashboard-tabs.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { CellRendererComponent } from './components/cell-renderer/cell-renderer.component';
import { AboutComponent } from './components/about/about.component';
import { TableColumnsPipe } from './pipes/table-columns.pipe';
import { RemoveTitleColumnPipe } from './pipes/remove-title-column.pipe';
import { UpcomingToLatestPipe } from './pipes/upcoming-to-latest.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    ContactModalComponent,
    BrowseContentComponent,
    BrowseOpportunitiesComponent,
    BrowseVolunteersComponent,
    DashboardComponent,
    DashboardTabsComponent,
    AddVolunteeringOpportunityComponent,
    AddVolunteersComponent,
    AddContentComponent,
    MatchComponent,
    StyleContactPipe,
    WeekdayNamesPipe,
    GenericTableComponent,
    CellRendererComponent,
    AboutComponent,
    TableColumnsPipe,
    RemoveTitleColumnPipe,
    UpcomingToLatestPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgArrayPipesModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
