import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { SalasComponent } from './sala/sala.component';
import { ScanComponent } from './scan/scan.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/gerenciamento', component: GerenciamentoComponent },
    { path: 'home/salas', component: SalasComponent },
    { path: 'home/salas/:id/scan', component: ScanComponent}
];
