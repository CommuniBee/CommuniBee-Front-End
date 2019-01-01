import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Stepper from 'bs-stepper';
declare var $;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  stepper: any;
  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(() => {
      this.stepper = new Stepper($('.bs-stepper')[0], { linear: true, animation: true }
      );
    });
  }

  nextPage(isLastStep: boolean = false) {
    if (isLastStep) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.stepper.next();
    }
  }

}
