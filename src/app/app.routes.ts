import { EmployeeDetailComponent } from './page/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './page/add-employee/add-employee.component';
import { LoginComponent } from './page/login/login.component';
import { EmployeeListComponent } from './page/employee-list/employee-list.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'employees',
        component: EmployeeListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employees/add',
        component: AddEmployeeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'employees/:username',
        component: EmployeeDetailComponent,
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/login' }
];