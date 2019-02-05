import {Component} from '@angular/core';
import {AuthService} from './services/communibee-backend/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CommuniBee';

  constructor(private authService: AuthService) {
  }
}
