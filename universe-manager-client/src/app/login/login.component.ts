import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    this.user = new User();
  }

  user: User;

  ngOnInit() {
  }

}
