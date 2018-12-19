import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {BrowseContentComponent} from './components/browse-content/browse-content.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse/content', component: BrowseContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
