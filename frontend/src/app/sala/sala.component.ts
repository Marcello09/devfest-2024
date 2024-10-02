import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EsvaziarDialogComponent } from './dialogs/esvaziar-dialog/esvaziar-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, CommonModule, RouterModule],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.scss'
})
export class SalasComponent {
  readonly dialog = inject(MatDialog)

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

  removeOne(id: string) {
    this.api.removerPessoa(id).subscribe(() => {
      this.carregaSalas();
    });
  }

  removeAll(id: string) {
    this.dialog.open(EsvaziarDialogComponent, {
      data: { id }
    }).afterClosed().subscribe(() => {
      this.carregaSalas();
    });
  }

}
