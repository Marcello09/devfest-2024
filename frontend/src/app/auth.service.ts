import { Injectable } from '@angular/core';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  private auth: Auth; 

  constructor(private firebaseService: FirebaseService) {
    this.auth = getAuth(this.firebaseService.app)
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }


  async isAuthenticated() {
    return this.auth.authStateReady().then(() => {
      return this.auth.currentUser ? true : false;
    })
  }

  getUser() {
    this.user;
  }

  getFirebaseAuth() {
    return this.auth
  }

}
