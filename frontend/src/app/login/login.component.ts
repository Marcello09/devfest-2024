import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import * as firebaseui from 'firebaseui';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from '../auth.service';

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

  constructor(private authService: AuthService) { }

  onGoogleSignIn = function (googleUser: any) {
    // Handle the Google One Tap sign-in response
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
  
  ngAfterViewInit(): void {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(this.authService.getFirebaseAuth());

    const signInCallback = (authResult: any, redirectUrl: any): boolean => {
      return false;
    }

    const signInFailure = (error: any) => {
      console.log('Sign in failure');
      // TODO: Show Message User Not Authorized!
    }

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID
      ],
      signInFlow: 'popup',
      signInSuccessUrl: 'home',
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      callbacks: {
        signInSuccessWithAuthResult: signInCallback,
        signInFailure: signInFailure
      }
    });
  }

}
