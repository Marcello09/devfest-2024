import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./shared/toolbar/toolbar.component";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';


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
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

  }
}
