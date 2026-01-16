import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { OPDPatientStatsComponent } from '@features/opd-patient-stats/pages/opd-patient-stats.component';
import { PatientQueueComponent } from '@features/opd-assessment/pages/patient-queue/patient-queue.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientWithCase } from '../model/patient.model';
import { HistoryComponent } from './history/history.component';
import { AutoRefractionComponent } from './auto-refraction/auto-refraction.component';
import { RefractionComponent } from './refraction/refraction.component';
import { AssessmentService } from '../services/assessment.service';

@Component({
    selector: 'app-assessment',
    standalone: true,
    templateUrl: './assessment.component.html',
    styleUrls: ['./assessment.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        OPDPatientStatsComponent,
        PatientQueueComponent,
        PatientInfoComponent,
        HistoryComponent,
        AutoRefractionComponent,
        RefractionComponent,
    ],
    providers: [AssessmentService]
})
export class AssessmentComponent {

    selectedPatientId: string | null = null;
    patients: PatientWithCase[] = [];
    patient: PatientWithCase | null = null;
    selectedQueue = 'My Queue';
    activeTab: string = '';
    tabs = [
        { id: 'history', label: 'History' },
        { id: 'auto-refraction', label: 'Auto Refraction' },
        { id: 'refraction', label: 'Refraction' }
    ];
    // tabs = [
    //     { id: 'history', label: 'History' },
    //     { id: 'overview', label: 'Overview' },
    //     { id: 'examination', label: 'Examination' },
    //     { id: 'diagnosis', label: 'Diagnosis' },
    //     { id: 'investigation', label: 'Investigation' },
    //     { id: 'advise', label: 'Advice' },
    //     { id: 'follow-up', label: 'Follow up' },
    //     { id: 'documents', label: 'Reports' }
    // ];

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
        this.patients = this.loadMockPatients();
        if (this.patients.length > 0) {
            this.selectedPatientId = this.patients[0].id;
        }
    }

    onQueueSelect(queueLabel: string) {
        this.selectedQueue = queueLabel;
        this.assessmentService.setVisiblePatientQueue(true);
    }

    onSelectPatient(event: any) {
        this.selectedPatientId = event;
        this.patient = this.patients.find(p => p.id === this.selectedPatientId) || null;
    }

    loadMockPatients() {
        return [
            {
                id: '1',
                name: 'Suhasini',
                mr_no: '20230001',
                gender: 'Female',
                age: 32,
                systemic_history: 'Hypertension',
                ophthalmic_history: 'None',
                previous_surgery: 'None',
                previous_diagnosis: 'None',
                allergies: 'None',
                phone: '9790897371',
                case: {
                    id: 'c1', patient_id: '1', visit_date: new Date().toISOString(),
                    status: 'New', appointment_type: 'Paid', patient_referral: 'Dr. Kranthi Brahmavar'
                }
            },
            {
                id: '2',
                name: 'Rajesh Kumar',
                mr_no: '20230002',
                gender: 'Male',
                age: 45,
                systemic_history: 'Diabetes',
                case: {
                    id: 'c2', patient_id: '2', visit_date: new Date(Date.now() - 15 * 60000).toISOString(),
                    status: 'Review', appointment_type: 'Free'
                }
            },
            {
                id: '3',
                name: 'Priya Sharma',
                mr_no: '20230003',
                gender: 'Female',
                age: 28,
                case: {
                    id: 'c3', patient_id: '3', visit_date: new Date(Date.now() - 45 * 60000).toISOString(),
                    status: 'Free', appointment_type: 'Free'
                }
            },
            {
                id: '4',
                name: 'Amit Patel',
                mr_no: '20230004',
                gender: 'Male',
                age: 60,
                case: {
                    id: 'c4', patient_id: '4', visit_date: new Date(Date.now() - 120 * 60000).toISOString(),
                    status: 'Paid', appointment_type: 'Paid'
                }
            }
        ];
    }

    setDefaultTab() {
        this.activeTab = 'history';
    }

    setActiveTab(tabId: string) {
        this.activeTab = tabId;
    }
}