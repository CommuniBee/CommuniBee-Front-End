import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/communibee-backend/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  getHomePath() {
    const DASHBOARD_PATH = '/dashboard';
    const HOME_PATH = '/';
    return this.auth.isAuthenticated() ? DASHBOARD_PATH : HOME_PATH;
  }

}
