import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { IPatient } from '../../model/patient.model';
import { ICase } from '../../model/case.model';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import { PatientJourneyHorizontalComponent } from '../patient-journey-horizontal/patient-journey-horizontal.component';
import { PatientJourneyVerticalComponent } from '../patient-journey-vertical/patient-journey-vertical.component';

@Component({
    selector: 'app-patient-info',
    standalone: true,
    templateUrl: './patient-info.component.html',
    styleUrls: ['./patient-info.component.scss'],
    imports: [CommonModule, FormsModule, PatientJourneyHorizontalComponent, PatientJourneyVerticalComponent],
    providers: []
})
export class PatientInfoComponent {

    @Input({ required: true }) patient!: IPatient;
    @Input({ required: true, alias: 'case' }) caseData!: ICase;

    showPatientJourneyHorizontal = false;
    showPatientJourneyVertical = false;

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    showVerticalJourney = computed(() => {
        const verticalVisible = this.assessmentService.getVerticalPatientJourney();
        return verticalVisible;
    });

    ngOnInit() {
        this.patient;
    }

    getStatusColor(status: string | undefined): string {
        switch (status?.toLowerCase()) {
            case 'new': return 'bg-teal-100';
            case 'free': return 'bg-emerald-100';
            case 'paid': return 'bg-amber-100';
            case 'review': return 'bg-violet-100';
            default: return 'bg-gray-100';
        }
    }

    getAppointmentTypeColor(type: string | undefined): string {
        switch (type?.toLowerCase()) {
            case 'free': return 'bg-emerald-100';
            case 'paid': return 'bg-amber-100';
            default: return 'bg-gray-100';
        }
    }

    getTimeDiff(date: string | undefined): string {
        if (!date) {
            return '';
        }
        const now = new Date();
        const visitDate = new Date(date);
        const diffMinutes = Math.floor((now.getTime() - visitDate.getTime()) / 60000);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        if (hours > 0) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}m`;
        return `${String(minutes).padStart(2, '0')}m`;
    }

    openJourneyButton(position: string, isOpen: boolean): void {
        if (position === 'horizontal') {
            this.showPatientJourneyHorizontal = !this.assessmentService.getHorizontalPatientJourney()();
            this.assessmentService.setHorizontalPatientJourney(this.showPatientJourneyHorizontal);
        } else if (position === 'vertical') {
            this.showPatientJourneyVertical = !this.assessmentService.getVerticalPatientJourney()();
            this.assessmentService.setVerticalPatientJourney(this.showPatientJourneyVertical);
        }
    }
}