import { Routes } from '@angular/router';
import { AuthGuardService } from '@core/guards/auth-guard.service';
import { ForbiddenComponent } from '@core/layout/forbidden/forbidden.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'outpatients',
        pathMatch: 'full'
    },
    {
        path: 'outpatients',
        loadComponent: () => import('./views/opd-assessment/components/assessment.component').then(m => m.AssessmentComponent),
        canActivate: [AuthGuardService]
    },
    {
        path: 'forbidden',
        loadComponent: () => import('./core/layout/forbidden/forbidden.component').then(m => m.ForbiddenComponent),
    },
];