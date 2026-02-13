import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'outpatients',
        pathMatch: 'full'
    },
    {
        path: 'outpatients',
        loadComponent: () => import('./views/opd-assessment/components/assessment.component').then(m => m.AssessmentComponent)
    }
];