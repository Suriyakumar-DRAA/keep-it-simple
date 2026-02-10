import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, inject, Input, Output, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { OPDPatientStatsComponent } from '@features/opd-patient-stats/pages/opd-patient-stats.component';
import { PatientQueueComponent } from '@features/opd-assessment/pages/patient-queue/patient-queue.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientWithCase } from '../model/patient.model';
import { HistoryComponent } from './history/history.component';
import { AutoRefractionComponent } from './auto-refraction/auto-refraction.component';
import { RefractionComponent } from './refraction/refraction.component';
import { AssessmentService } from '../services/assessment.service';
import { OverviewComponent } from './overview/overview.component';
import { ExaminationComponent } from './examination/examination.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { InvestigationComponent } from './investigation/investigation.component';
import { PatientJourneyComponent } from './patient-journey/patient-journey.component';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { ReportsComponent } from './reports/reports.component';
import { SplitWindowComponent } from './split-window/split-window.component';

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
        OverviewComponent,
        ExaminationComponent,
        // DiagnosisComponent,
        InvestigationComponent,
        HistoryComponent,
        AutoRefractionComponent,
        RefractionComponent,
        PatientJourneyComponent,
        PatientSummaryComponent,
        ReportsComponent,
        SplitWindowComponent
    ],
    providers: [
        AssessmentService,
        BsModalService
    ]
})
export class AssessmentComponent {

    selectedPatientId: string | null = null;
    patients: PatientWithCase[] = [];
    patient: PatientWithCase | null = null;
    selectedQueue = 'My Queue';
    activeTabId = 'overview';
    isSidebarOpen = false;
    splitConfig = { left: 50, right: 50 };
    tabs = [
        { id: 'overview', label: 'Overview', completed: true },
        { id: 'exam', label: 'Examination', completed: true },
        { id: 'invest', label: 'Investigation', completed: true },
        { id: 'diag', label: 'Diagnosis', completed: true },
        { id: 'advice', label: 'Advice', completed: true },
        { id: 'reports', label: 'Reports', completed: true },
        // { id: 'ref', label: 'Referral', completed: false },
        // { id: 'follow', label: 'Follow up', completed: false },
    ];
    modalRef?: BsModalRef;
    currentSide: 'left' | 'right' = 'left';


    private assessmentService = inject(AssessmentService);

    constructor(private modalService: BsModalService) {
    }

    ngOnInit() {
        this.patients = this.loadMockPatients();
        if (this.patients.length > 0) {
            this.selectedPatientId = this.patients[0].id;
            this.patient = this.patients.find(p => p.id === this.selectedPatientId) || null;
        }
        this.setDefaultTab();
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
                mr_no: 'NLR/2023/0001',
                gender: 'Female',
                age: 32,
                systemic_history: 'Hypertension',
                ophthalmic_history: 'None',
                previous_surgery: 'None',
                previous_diagnosis: 'None',
                infectious_disease: 'None',
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
                mr_no: 'NLR/2023/0002',
                gender: 'Male',
                age: 45,
                systemic_history: 'Diabetes',
                infectious_disease: 'None',
                case: {
                    id: 'c2', patient_id: '2', visit_date: new Date(Date.now() - 15 * 60000).toISOString(),
                    status: 'Review', appointment_type: 'Free'
                }
            },
            {
                id: '3',
                name: 'Priya Sharma',
                mr_no: 'NLR/2023/0003',
                gender: 'Female',
                infectious_disease: 'None',
                age: 28,
                case: {
                    id: 'c3', patient_id: '3', visit_date: new Date(Date.now() - 45 * 60000).toISOString(),
                    status: 'Free', appointment_type: 'Free'
                }
            },
            {
                id: '4',
                name: 'Amit Patel',
                mr_no: 'NLR/2023/0004',
                gender: 'Male',
                age: 60,
                infectious_disease: 'None',
                case: {
                    id: 'c4', patient_id: '4', visit_date: new Date(Date.now() - 120 * 60000).toISOString(),
                    status: 'Paid', appointment_type: 'Paid'
                }
            }
        ];
    }

    setDefaultTab() {
        this.activeTabId = 'overview';
    }

    setActiveTab(tabId: string) {
        this.activeTabId = tabId;
    }

    timelineOpenModal(template: TemplateRef<any>, side: 'left' | 'right') {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

    timelineCloseModal() {
        this.isSidebarOpen = false;
    }

    // timelineOpenModal(template: TemplateRef<any>, side: 'left' | 'right') {
    //     this.currentSide = side;

    //     this.modalRef = this.modalService.show(template, {
    //         // ngx-bootstrap applies this class to the modal-dialog
    //         backdrop: false,
    //         class: `modal-${side}`,
    //         animated: true
    //     });
    // }

    // timelineCloseModal() {
    //     if (this.modalRef) {
    //         this.modalRef.hide();
    //     }
    // }
}