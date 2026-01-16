import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'outpatients',
        pathMatch: 'full'
    },
    {
        path: 'outpatients',
        loadComponent: () => import('./features/opd-assessment/pages/assessment.component').then(m => m.AssessmentComponent)
    }
];