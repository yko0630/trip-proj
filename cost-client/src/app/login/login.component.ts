import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userProfile: gapi.auth2.BasicProfile;
  constructor(private authService:AuthService,private ngZone:NgZone,private http:Http) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess':  googleUser => this.ngZone.run(() => this.hanldeSuccess(googleUser))
    });
  }

  hanldeSuccess(googleUser: gapi.auth2.GoogleUser){
    this.userProfile = googleUser.getBasicProfile();
    this.authService.onSignIn(googleUser);
  }

  logout(){
    gapi.auth2.getAuthInstance().disconnect();
    this.userProfile=null;
    this.authService.onSignOut();
  }
}
