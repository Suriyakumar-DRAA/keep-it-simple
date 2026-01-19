import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-diagnosis',
    standalone: true,
    templateUrl: './diagnosis.component.html',
    styleUrls: ['./diagnosis.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class DiagnosisComponent {

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }
}