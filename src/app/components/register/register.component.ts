import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
declare var $;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  stepper: any;
  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      this.stepper = new Stepper($('.bs-stepper')[0], { linear: true, animation: true }
      );
    });
  }

  nextPage() {
    this.stepper.next();
  }

}
