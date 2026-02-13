import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@views/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-auto-refraction',
    standalone: true,
    templateUrl: './auto-refraction.component.html',
    styleUrls: ['./auto-refraction.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class AutoRefractionComponent {

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }
}