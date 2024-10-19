import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { SalasComponent } from './sala/sala.component';
import { ScanComponent } from './scan/scan.component';
import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';
import { DashComponent } from './dash/dash.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dash', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AppGuard] },
    { path: 'home/gerenciamento', component: GerenciamentoComponent, canActivate: [AppGuard] },
    { path: 'home/salas', component: SalasComponent, canActivate: [AppGuard] },
    { path: 'home/salas/:id/scan', component: ScanComponent, canActivate: [AppGuard] },
    { path: 'dash', component: DashComponent },
    { path: '**', redirectTo: '/dash' }
];
