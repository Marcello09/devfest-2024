import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciamento',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './gerenciamento.component.html',
  styleUrl: './gerenciamento.component.scss'
})
export class GerenciamentoComponent {
  readonly dialog = inject(MatDialog)

  dataSource = [];
  displayedColumns = ['id', 'nome', 'max_pessoas', 'actions'];

  constructor(private api: ApiService) {
    this.loadList()
  }

  loadList() {
    this.api.listarSalas().subscribe((data: any) => {
      this.dataSource = data
    })
  }

  openDeleteDialog(id: string, nome: string) {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
        nome
      }
    })
    .afterClosed().subscribe(() => {
      this.loadList()
    });
  }

  openAddDialog() {
    this.dialog.open(AddDialogComponent)
    .afterClosed().subscribe(() => {
      this.loadList()
    })
    
  }

}
