import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { SalasComponent } from './sala/sala.component';
import { ScanComponent } from './scan/scan.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'home/gerenciamento', component: GerenciamentoComponent },
    { path: 'home/salas', component: SalasComponent },
    { path: 'home/salas/scan', component: ScanComponent}
];
