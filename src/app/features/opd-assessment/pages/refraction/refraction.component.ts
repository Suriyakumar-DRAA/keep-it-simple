import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-refraction',
    standalone: true,
    templateUrl: './refraction.component.html',
    styleUrls: ['./refraction.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class RefractionComponent {

    constructor() {
    }

    ngOnInit() {
    }
}