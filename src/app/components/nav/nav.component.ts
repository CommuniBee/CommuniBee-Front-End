import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {User} from '../../services/communibee-backend/user/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit() {
  }

  getHomePath() {
    const DASHBOARD_PATH = '/dashboard';
    const HOME_PATH = '/';
    return this.auth.isAuthenticated() ? DASHBOARD_PATH : HOME_PATH;
  }

}
