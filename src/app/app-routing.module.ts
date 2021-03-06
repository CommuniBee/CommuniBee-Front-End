import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BrowseContentComponent} from './components/browse-content/browse-content.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddVolunteeringOpportunityComponent} from './components/add-volunteering-opportunity/add-volunteering-opportunity.component';
import {AddVolunteersComponent} from './components/add-volunteers/add-volunteers.component';
import {MatchComponent} from './components/match/match.component';
import {AuthService} from './services/communibee-backend/auth/auth.service';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'browse/content', component: BrowseContentComponent},
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'opportunities/add', component: AddVolunteeringOpportunityComponent},
      {path: 'volunteers/add', component: AddVolunteersComponent},
      {path: 'match', component: MatchComponent},
    ],
    canActivateChild: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
