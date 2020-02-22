import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginUrl = this.authService.redirectUrl;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
