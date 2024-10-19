import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, CommonModule, RouterModule],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent {

  salas: any[] = [];

  constructor(
    private api: ApiService,
  ) {
    this.carregaSalas()
  }
  
  private carregaSalas() {
    this.api.listarSalas().subscribe((salas: any) => {
      this.salas = salas;
    });
  }

}
