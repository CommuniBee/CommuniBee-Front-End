import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Stepper from 'bs-stepper';
import {AuthService} from '../../services/communibee-backend/auth/auth.service';
import {UserService} from '../../services/communibee-backend/user/user.service';
import {User, UserModel} from '../../services/communibee-backend/user/user';

declare var $;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  stepper: any;
  is_auth0_callback: boolean;

  constructor(private router: Router, public auth: AuthService, private route: ActivatedRoute, private users: UserService) {
  }

  ngOnInit() {
    $(document).ready(() => {
      this.subscribeToParams();
      this.initStepper();
      if (this.is_auth0_callback) {
        this.stepper.next();
      }
    });
  }

  initStepper() {
    this.stepper = new Stepper($('.bs-stepper')[0], {
        linear: true,
        animation: true
      }
    );
  }

  subscribeToParams() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.is_auth0_callback = params['auth0_callback'] === 'true';
      }
    );
  }

  nextPage(isLastStep: boolean = false) {
    if (isLastStep) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.stepper.next();
    }
  }

  launchAuth0() {
    this.auth.login();
  }

  register() {
    const user: User = {};
    user.email = $('#email').val();
    user.name = $('#name').val();
    user.sub_id = this.auth.getIdTokenPayload().sub;
    console.log(user);
    this.users.create(user).then(savedUser => {
      if (savedUser) {
        this.router.navigateByUrl('/dashboard');
      } else  {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

}
