import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
    this.user = new User;
   }

  user: User;

  password_confirm: string;

  ngOnInit() {
  }

}
