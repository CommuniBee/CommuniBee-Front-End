import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/communibee-backend/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CommuniBee';

  constructor(public authService: AuthService) {
    authService.handleAuthentication();
  }

  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.authService.renewTokens();
    }
  }

}
