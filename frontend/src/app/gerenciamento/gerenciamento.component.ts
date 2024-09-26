import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './gerenciamento.component.html',
  styleUrl: './gerenciamento.component.scss'
})
export class GerenciamentoComponent {
  readonly dialog = inject(MatDialog)

  dataSource = [
    { id: "1", nome: 'IA', max_pessoas: 80 },
  ]
  displayedColumns = ['id', 'nome', 'max_pessoas', 'actions'];

  openDeleteDialog(id: string, nome: string) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        nome
      }
    })
  }

  openAddDialog() {
    this.dialog.open(AddDialogComponent)
  }

}
