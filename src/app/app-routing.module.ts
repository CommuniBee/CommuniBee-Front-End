import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BrowseContentComponent} from './components/browse-content/browse-content.component';
import {BrowseVolunteersComponent} from './components/browse-volunteers/browse-volunteers.component';
import {BrowseOpportunitiesComponent} from './components/browse-opportunities/browse-opportunities.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddVolunteeringOpportunityComponent} from './components/add-volunteering-opportunity/add-volunteering-opportunity.component';
import {AddVolunteersComponent} from './components/add-volunteers/add-volunteers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse/content', component: BrowseContentComponent },
  { path: 'browse/volunteers', component: BrowseVolunteersComponent },
  { path: 'browse/opportunities', component: BrowseOpportunitiesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'opportunities/add', component: AddVolunteeringOpportunityComponent },
  { path: 'volunteers/add', component: AddVolunteersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
