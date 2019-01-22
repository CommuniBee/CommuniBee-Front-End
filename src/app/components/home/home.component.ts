import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  getJoinUsPath() {
    const DASHBOARD_PATH = '/dashboard';
    const REGISTER_PATH = '/register';
    return this.auth.isAuthenticated() ? DASHBOARD_PATH : REGISTER_PATH;
  }

}
