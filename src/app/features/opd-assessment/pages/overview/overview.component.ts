import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-overview',
    standalone: true,
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class OverviewComponent {

    @Output() viewTimeline = new EventEmitter<void>();

    private assessmentService = inject(AssessmentService);


    constructor() {
    }

    ngOnInit() {
    }
}