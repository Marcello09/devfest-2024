import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  data = inject(MAT_DIALOG_DATA)

  constructor(private api: ApiService) {}

  delete() {
    this.api.deletarSala(this.data.id).subscribe({
      error: (error) => { console.log(error)},
      complete: () => { this.dialogRef.close()}
    });
  }
}
