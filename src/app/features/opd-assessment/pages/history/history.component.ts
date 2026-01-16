import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-history',
    standalone: true,
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class HistoryComponent {

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }
}