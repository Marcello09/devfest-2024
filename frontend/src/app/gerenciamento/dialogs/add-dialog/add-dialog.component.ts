import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddDialogComponent>);

  add() {
    console.log('Não implementado: Adicionar')
  }

}
