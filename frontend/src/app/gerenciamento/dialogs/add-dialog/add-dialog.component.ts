import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-add-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.scss'
})
export class AddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddDialogComponent>);

  nome: string = ''
  max_pessoas: number = 60

  constructor(private api: ApiService) {}

  add() {
    this.api.criarSala(this.nome, this.max_pessoas).subscribe(() => {
      this.dialogRef.close()
    })
  }

}
