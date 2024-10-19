import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  app: FirebaseApp;

  constructor() {
     // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyD98JsuXE1w7ainrosODVYeH3E2WbsFrjI",
      authDomain: "moreira-devfest-2024.firebaseapp.com",
      projectId: "moreira-devfest-2024",
      storageBucket: "moreira-devfest-2024.appspot.com",
      messagingSenderId: "252847206578",
      appId: "1:252847206578:web:cf4d55cdcd964ec34e99ab",
      measurementId: "G-WBS3W6S0XD"
    };
    
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(this.app);
  }
}
