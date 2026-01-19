import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { PatientWithCase } from '../../model/patient.model';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';

@Component({
    selector: 'app-patient-journey',
    standalone: true,
    templateUrl: './patient-journey.component.html',
    styleUrls: ['./patient-journey.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class PatientJourneyComponent {

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }
}