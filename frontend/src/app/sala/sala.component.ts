import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EsvaziarDialogComponent } from './dialogs/esvaziar-dialog/esvaziar-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sala',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, CommonModule, RouterModule],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.scss'
})
export class SalasComponent {
  readonly dialog = inject(MatDialog)

  items: any[] = [
    {
      nome: 'Sala 1',
      id: 1,
      max_pessoas: 10,
      pessoas: 5
    },
    {
      nome: 'Sala 2',
      id: 2,
      max_pessoas: 200,
      pessoas: 87
    },
    {
      nome: 'Sala 3',
      id: 3,
      max_pessoas: 50,
      pessoas: 44
    }
  ];

  scan(id: any) {

  }

  removeOne(id: any) {

  }

  removeAll(id: any) {
    this.dialog.open(EsvaziarDialogComponent);

  }

}
