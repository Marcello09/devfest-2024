import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-esvaziar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './esvaziar-dialog.component.html',
})
export class EsvaziarDialogComponent {
  delete() {
    console.log('Não implementado');
  }
}
