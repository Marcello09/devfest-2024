import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-esvaziar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogModule],
  templateUrl: './esvaziar-dialog.component.html',
})
export class EsvaziarDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EsvaziarDialogComponent>);
  data = inject(MAT_DIALOG_DATA)

  constructor(private api: ApiService) { }

  delete() {
    this.api.esvaziarSala(this.data.id).subscribe(() => {
      this.dialogRef.close()
    })
  }
}
