import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@views/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-investigation',
    standalone: true,
    templateUrl: './investigation.component.html',
    styleUrls: ['./investigation.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class InvestigationComponent {

    isEditing = true;
    activeCategory: 'Ophthal' | 'Laboratory' | 'Radiology' = 'Laboratory';
    selectedTest = '';
    selectedSet = '';
    investigations: any[] = [];


    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }

    // Mock Data Sources
    tests = {
        Laboratory: ['CBC', 'Blood Sugar', 'Lipid Profile', 'HbA1c'],
        Ophthal: ['OCT', 'Fundus Photo', 'Perimetry'],
        Radiology: ['X-Ray Orbit', 'CT Head']
    };
    sets = {
        Laboratory: ['Diabetic Panel', 'Pre-op Panel'],
        Ophthal: ['Glaucoma Workup', 'Retina Workup'],
        Radiology: ['Trauma Series']
    };

    getTestsForCategory() { return this.tests[this.activeCategory]; }
    getSetsForCategory() { return this.sets[this.activeCategory]; }

    addInvestigation() {
        if (!this.selectedTest) return;
        this.investigations.push({
            id: Math.random().toString(36).substr(2, 9),
            category: this.activeCategory,
            investigation_type: 'Standard',
            test_name: this.selectedTest,
            test_set: this.selectedSet,
            advised_by: 'Dr. Kranthi',
            test_date: new Date().toISOString(),
            status: 'Pending'
        });
        this.selectedTest = '';
        this.selectedSet = '';
    }
}