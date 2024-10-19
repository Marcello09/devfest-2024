import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false;
  private user: any;
  private auth: Auth; 

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.auth = getAuth(firebaseService.app)

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authenticated = true;
        this.user = user;
        this.router.navigate(['/home']);
      } else {
        this.authenticated = false;
        this.user = null;
      }
    });
  }


  isAuthenticated(): boolean {
    return this.authenticated
  }

  getUser() {
    this.user;
  }

  getFirebaseAuth() {
    return this.auth
  }

}
