import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-esvaziar-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule, 
    MatButtonModule, 
    MatDialogModule,
    MatFormField,
    MatInputModule,
  ],
  templateUrl: './esvaziar-dialog.component.html',
})
export class EsvaziarDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EsvaziarDialogComponent>);
  data = inject(MAT_DIALOG_DATA)

  quantidade = 0;

  constructor(private api: ApiService) { }

  delete() {
    this.api.esvaziarSala(this.data.id).subscribe(() => {
      this.dialogRef.close()
    })
  }

  removeMany() {
    this.api.removerPessoas(this.data.id, this.quantidade).subscribe(() => {
      this.dialogRef.close()
    })
  }
}
