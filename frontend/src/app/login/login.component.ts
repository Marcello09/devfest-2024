import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import * as firebaseui from 'firebaseui';
import { getAuth, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule, 
    MatInputModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {

  hide = true;

  onGoogleSignIn = function (googleUser: any) {
    // Handle the Google One Tap sign-in response
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  constructor(private router: Router) {
    getRedirectResult(getAuth()).then((result) => {
      console.log(result)
      if (result) {
        this.router.navigate(['/home']);
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(getAuth());
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID
      ],
      signInFlow: 'popup',
      signInSuccessUrl: 'home',
    });
  }

}
