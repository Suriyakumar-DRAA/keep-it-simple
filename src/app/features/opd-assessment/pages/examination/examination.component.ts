import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';
interface EyeData {
    size: 'Normal' | 'Micro' | 'Macro';
    shape: string;
    surface: string;
    staining: string;
}

@Component({
    selector: 'app-examination',
    standalone: true,
    templateUrl: './examination.component.html',
    styleUrls: ['./examination.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class ExaminationComponent {

    isEditing = false;
    expandedSections = new Set<string>(['appendages']);
    activeSection: string = 'Appendages';

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }

    // Define sections for mapping in template to avoid repetition
    sections: any[] = [
        { id: 'appendages', label: 'Appendages', statusKey: 'appendages_status', notesKey: 'appendages_notes' },
        { id: 'conjunctiva', label: 'Conjunctiva', statusKey: 'conjunctiva_status', notesKey: 'conjunctiva_notes' },
        { id: 'sclera', label: 'Sclera', statusKey: 'sclera_status', notesKey: 'sclera_notes' },
        { id: 'cornea', label: 'Cornea', statusKey: 'cornea_status', notesKey: '' }, // Special handling
        { id: 'anterior_chamber', label: 'Anterior Chamber', statusKey: 'anterior_chamber_status', notesKey: 'anterior_chamber_notes' },
        { id: 'pupil', label: 'Pupil', statusKey: 'pupil_status', notesKey: 'pupil_notes' },
        { id: 'iris', label: 'Iris', statusKey: 'iris_status', notesKey: 'iris_notes' },
        { id: 'lens', label: 'Lens', statusKey: 'lens_status', notesKey: 'lens_notes' },
        { id: 'iop', label: 'IOP', statusKey: 'iop_status', notesKey: 'iop_notes' },
        { id: 'gonioscopy', label: 'Gonioscopy', statusKey: 'gonioscopy_status', notesKey: 'gonioscopy_notes' },
        { id: 'fundus', label: 'Fundus', statusKey: 'fundus_status', notesKey: 'fundus_notes' },
    ];

    data: any = {
        general_examination: 'Normal', one_eyed: 'Normal', squint_evaluation: 'Normal', overall_diagnosis_right: 'Normal', overall_diagnosis_left: 'Normal',
        appendages_status: 'completed', appendages_notes: 'Normal appearance',
        conjunctiva_status: 'completed', conjunctiva_notes: 'Clear',
        sclera_status: 'completed', sclera_notes: 'White',
        cornea_status: 'in_progress',
        cornea_right_size: 'Normal', cornea_right_shape: 'Normal', cornea_right_surface: 'Normal', cornea_right_fluorescein: 'Normal', cornea_right_sensation: 'Normal',
        cornea_right_schirmer1_value: '35', cornea_right_schirmer1_unit: '02', cornea_right_schirmer1_time: '02',
        cornea_right_schirmer2_value: '35', cornea_right_schirmer2_unit: '02', cornea_right_schirmer2_time: '06',
        cornea_left_size: 'Normal', cornea_left_shape: 'Normal', cornea_left_surface: 'Normal', cornea_left_fluorescein: 'Normal', cornea_left_sensation: 'Normal',
        cornea_left_schirmer1_value: '35', cornea_left_schirmer1_unit: '02', cornea_left_schirmer1_time: '02',
        cornea_left_schirmer2_value: '35', cornea_left_schirmer2_unit: '02', cornea_left_schirmer2_time: '06',
        anterior_chamber_status: 'pending', anterior_chamber_notes: '',
        pupil_status: 'pending', pupil_notes: '',
        iris_status: 'pending', iris_notes: '',
        lens_status: 'pending', lens_notes: '',
        iop_status: 'pending', iop_notes: '',
        gonioscopy_status: 'pending', gonioscopy_notes: '',
        fundus_status: 'pending', fundus_notes: '',
    };

    toggleSection(id: string) {
        if (this.expandedSections.has(id)) this.expandedSections.delete(id);
        else this.expandedSections.add(id);
    }

    copyRightToLeft() {
        this.data.cornea_left_size = this.data.cornea_right_size;
        // ... copy other fields ...
    }

    saveData() {
        console.log('Saving examination data...', this.data);
    }


    reData: EyeData = { size: 'Macro', shape: 'Normal', surface: 'Normal', staining: 'Normal' };
    leData: EyeData = { size: 'Macro', shape: 'Normal', surface: 'Normal', staining: 'Normal' };

    // Options for dropdowns
    shapes = ['Normal', 'Keratoconus', 'Globus',];
    surfaces = ['Normal', 'Irregular', 'Hazy', 'Keratoconus', 'Keratoglobus'];
    stainings = ['Normal', 'Punctate', 'Ulcer'];

    copyReToLe() {
        this.leData = { ...this.reData };
    }

    selectSection(label: string) {
        this.activeSection = label;
    }

    // Example of how to handle the multi-click toggle logic
    toggleSelection(data: any, field: string, value: string) {
        if (!data[field]) {
            data[field] = [];
        }
        const index = data[field].indexOf(value);
        if (index > -1) {
            data[field].splice(index, 1);
        } else {
            data[field].push(value);
        }
    }

    isSelected(data: any, field: string, value: string): boolean {
        return data[field]?.includes(value) || false;
    }

    mmRange = Array.from({ length: 12 }, (_, i) => i); // 0 to 35
    timeRange = Array.from({ length: 12 }, (_, i) => i.toString().padStart(2, '0')); // 00 to 60

}