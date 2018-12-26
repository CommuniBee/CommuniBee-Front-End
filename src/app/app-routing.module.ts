import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BrowseContentComponent} from './components/browse-content/browse-content.component';
import {BrowseVolunteersComponent} from './components/browse-volunteers/browse-volunteers.component';
import {BrowseOpportunitiesComponent} from './components/browse-opportunities/browse-opportunities.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse/content', component: BrowseContentComponent },
  { path: 'browse/volunteers', component: BrowseVolunteersComponent },
  { path: 'browse/opportunities', component: BrowseOpportunitiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
