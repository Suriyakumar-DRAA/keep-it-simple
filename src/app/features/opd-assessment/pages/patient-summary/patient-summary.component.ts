import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-patient-summary',
    standalone: true,
    templateUrl: './patient-summary.component.html',
    styleUrls: ['./patient-summary.component.scss'],
    imports: [CommonModule, FormsModule, ModalModule],
    providers: [BsModalService]
})
export class PatientSummaryComponent {

    @Input() showTimelineTabs: boolean = true;

    @Output() close = new EventEmitter<void>();

    currentDate = new Date();
    activeDate = signal('28 Nov 2025');
    dates = [
        '28 Nov 2025',
        '24 Nov 2025',
        '21 Nov 2025',
        '17 Nov 2025',
        '14 Nov 2025',
    ];

    private assessmentService = inject(AssessmentService);

    constructor(private modalService: BsModalService) {
    }

    ngOnInit() {
    }
}