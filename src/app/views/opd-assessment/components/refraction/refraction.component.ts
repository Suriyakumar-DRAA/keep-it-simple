import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectedContactLensData, SelectedGlassesData, SelectedPinholeVisionData, SelectedPrData, SelectedUcvaData } from '@views/opd-assessment/model/refraction-model';


@Component({
    selector: 'app-refraction',
    standalone: true,
    templateUrl: './refraction.component.html',
    styleUrls: ['./refraction.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class RefractionComponent {
    sections: any[] = [
        { id: 'visualAcuity', label: 'Visual Acuity', statusKey: 'visual_acuity_status', notesKey: 'visual_acuity_notes' },
        { id: 'iop', label: 'Intraocular Pressure', statusKey: 'iop_status', notesKey: 'iop_notes' },
        { id: 'autoRefraction', label: 'Auto Refraction', statusKey: 'auto_refraction_status', notesKey: 'auto_refraction_notes' },
        { id: 'dryRefraction', label: 'Dry Refraction', statusKey: 'dry_refraction_status', notesKey: 'dry_refraction_notes' },
        { id: 'dilatedRefraction', label: 'Dilated Refraction', statusKey: 'dilated_refraction_status', notesKey: 'dilated_refraction_notes' },
        { id: 'pgp', label: 'PGP', statusKey: 'pgp_status', notesKey: 'pgp_notes' },
        { id: 'glassPrescription', label: 'Glass Prescription', statusKey: 'glass_prescription_status', notesKey: 'glass_prescription_notes' },
        { id: 'intermediateGlassPrescription', label: 'Intermediate Glass Prescription', statusKey: 'intermediate_glass_prescription_status', notesKey: 'intermediate_glass_prescription_notes' },
        { id: 'pmt', label: 'PMT', statusKey: 'pmt_status', notesKey: 'pmt_notes' },
        { id: 'retinoScopy', label: 'Retinoscopy', statusKey: 'retinoscopy_status', notesKey: 'retinoscopy_notes' },
        { id: 'keratometry', label: 'Keratometry', statusKey: 'keratometry_status', notesKey: 'keratometry_notes' },
        { id: 'amsler', label: 'Amsler', statusKey: 'amsler_status', notesKey: 'amsler_notes' },
        { id: 'contactLens', label: 'Contact Lens', statusKey: 'contact_lens_status', notesKey: 'contact_lens_notes' },
        { id: 'colorVision', label: 'Color Vision', statusKey: 'color_vision_status', notesKey: 'color_vision_notes' },
        { id: 'orthoptics', label: 'Orthoptics', statusKey: 'orthoptics_status', notesKey: 'orthoptics_notes' },   
    ];
    activeSection: string = 'visualAcuity';
    reData = {
        distance: ["PL-", "PL+", "FL", "HM", "CFCF", "FC", "1/60", "2/60", "3/60", "4/60", "5/60", "6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/7.5", "6/6", "6/5"],
        near: ["N4", "N5", "N6", "N8", "N10", "N12", "N14", "N18", "N24", "N26", "N36", "<.N36", "<6/60", "6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/7.5", "6/6", "6/5"]
    };
    leData = {
        distance: ["PL-", "PL+", "FL", "HM", "CFCF", "FC", "1/60", "2/60", "3/60", "4/60", "5/60", "6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/7.5", "6/6", "6/5"],
        near: ["N4", "N5", "N6", "N8", "N10", "N12", "N14", "N18", "N24", "N26", "N36", "<.N36", "<6/60", "6/60", "6/36", "6/24", "6/18", "6/12", "6/9", "6/7.5", "6/6", "6/5"]
    };
    selectedUCVAData : SelectedUcvaData = {} as SelectedUcvaData;
    selectedPinHoleVisionData: SelectedPinholeVisionData = {} as SelectedPinholeVisionData;
    selectedGlassesData : SelectedGlassesData = {} as SelectedGlassesData;
    selectedContactLensData : SelectedContactLensData = {} as SelectedContactLensData;
    prDropDownData = ["Sel", "+", "-"];
    selectedPRData : SelectedPrData = {} as SelectedPrData;
    visualAcuityCommentRe!: string;
    visualAcuityCommentLe!: string;
    
    constructor() {}

    ngOnInit() {}

    selectSection(id: string) {
        this.activeSection = id;
    }

    selectVisualAcuityDistanceVision(eye: 're' | 'le', value: string) {
        if (eye === 're') {
            this.selectedUCVAData.distanceRe = value;
        } else {
            this.selectedUCVAData.distanceLe = value;
        }
    }

    selectVisualAcuityNearVision(eye: 're' | 'le', value: string) {
        if (eye === 're') {
            this.selectedUCVAData.nearRe = value;
        } else {
            this.selectedUCVAData.nearLe = value;
        }
    }

    selectPinHoleVision(eye: 're' | 'le', value: string) {
        if (eye === 're') {
            this.selectedPinHoleVisionData.rightEye = value;
        } else {
            this.selectedPinHoleVisionData.leftEye = value;
        }
    }

    toggleVisualAcuityDistanceP(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedUCVAData.isPDistanceCheckedRe = !this.selectedUCVAData.isPDistanceCheckedRe;
        } else {
            this.selectedUCVAData.isPDistanceCheckedLe = !this.selectedUCVAData.isPDistanceCheckedLe;
        }
    }

    toggleVisualAcuityNearP(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedUCVAData.isPNearCheckedRe = !this.selectedUCVAData.isPNearCheckedRe;
        } else {
            this.selectedUCVAData.isPNearCheckedLe = !this.selectedUCVAData.isPNearCheckedLe;
        }
    }

    togglePinHoleP(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedPinHoleVisionData.isPCheckedRe = !this.selectedPinHoleVisionData.isPCheckedRe;
        } else {
            this.selectedPinHoleVisionData.isPCheckedLe = !this.selectedPinHoleVisionData.isPCheckedLe;
        }
    }

    togglePinHoleNI(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedPinHoleVisionData.isNICheckedRe = !this.selectedPinHoleVisionData.isNICheckedRe;
        } else {
            this.selectedPinHoleVisionData.isNICheckedLe = !this.selectedPinHoleVisionData.isNICheckedLe;
        }
    }

    selectGlassesDistanceVision(eye: 're' | 'le', value: string) {
        if (eye === 're') {
            this.selectedGlassesData.distanceRe = value;
        } else {
            this.selectedGlassesData.distanceLe = value;
        }
    }

    selectGlassesNearVision(eye: 're' | 'le', value: string) {
        if (eye === 're') {
            this.selectedGlassesData.nearRe = value;
        } else {
            this.selectedGlassesData.nearLe = value;
        }
    }

    toggleGlassesDistanceP(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedGlassesData.isPDistanceCheckedRe = !this.selectedGlassesData.isPDistanceCheckedRe;
        }
        else {
            this.selectedGlassesData.isPDistanceCheckedLe = !this.selectedGlassesData.isPDistanceCheckedLe;
        }
    }

    toggleGlassesNearP(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedGlassesData.isPNearCheckedRe = !this.selectedGlassesData.isPNearCheckedRe;
        } else {
            this.selectedGlassesData.isPNearCheckedLe = !this.selectedGlassesData.isPNearCheckedLe;
        }
    }

    selectContactLensVision(eye: 're' | 'le', value: string) {
        if (eye === 're') {
            this.selectedContactLensData.rightEye = value;
        } else {
            this.selectedContactLensData.leftEye = value;
        }
    }

    toggleContactLensP(eye: 're' | 'le') {
        if (eye === 're') {
            this.selectedContactLensData.isPRightEyeChecked = !this.selectedContactLensData.isPRightEyeChecked;
        } else {
            this.selectedContactLensData.isPLeftEyeChecked = !this.selectedContactLensData.isPLeftEyeChecked;
        }
    }

    selectPRDataField(eye: 're' | 'le', field: 's' | 'i' | 'n' | 't', value: string) {
        const fieldKey = `${field}_${eye}`;
        (this.selectedPRData as any)[fieldKey] = value;
    }

    updateUCVAComment(eye: 're' | 'le', type: 'distance' | 'near', comment: string) {
        if (eye === 're') {
            if (type === 'distance') {
                this.selectedUCVAData.commentDistanceRe = comment;
            } else {
                this.selectedUCVAData.commentNearRe = comment;
            }
        } else {
            if (type === 'distance') {
                this.selectedUCVAData.commentDistanceLe = comment;
            } else {
                this.selectedUCVAData.commentNearLe = comment;
            }
        }
    }

    updatePinHoleComment(eye: 're' | 'le', comment: string) {
        if (eye === 're') {
            this.selectedPinHoleVisionData.commentRe = comment;
        } else {
            this.selectedPinHoleVisionData.commentLe = comment;
        }
    }

    updateVisualAcuityComment(eye: 're' | 'le', comment: string) {
        if (eye === 're') {
            this.visualAcuityCommentRe = comment;
        } else {
            this.visualAcuityCommentLe = comment;
        }
    };

    copyReToLe() {
        this.selectedUCVAData.distanceLe = this.selectedUCVAData.distanceRe;
        this.selectedUCVAData.nearLe = this.selectedUCVAData.nearRe;
        this.selectedUCVAData.isPDistanceCheckedLe = this.selectedUCVAData.isPDistanceCheckedRe;
        this.selectedUCVAData.isPNearCheckedLe = this.selectedUCVAData.isPNearCheckedRe;
        this.selectedUCVAData.commentDistanceLe = this.selectedUCVAData.commentDistanceRe;
        this.selectedUCVAData.commentNearLe = this.selectedUCVAData.commentNearRe;
        this.selectedPinHoleVisionData.isPCheckedLe = this.selectedPinHoleVisionData.isPCheckedRe;
        this.selectedPinHoleVisionData.isNICheckedLe = this.selectedPinHoleVisionData.isNICheckedRe;
        this.selectedPinHoleVisionData.leftEye = this.selectedPinHoleVisionData.rightEye;
        this.selectedPinHoleVisionData.commentLe = this.selectedPinHoleVisionData.commentRe;
        this.selectedGlassesData.distanceLe = this.selectedGlassesData.distanceRe;
        this.selectedGlassesData.nearLe = this.selectedGlassesData.nearRe;
        this.selectedGlassesData.isPDistanceCheckedLe = this.selectedGlassesData.isPDistanceCheckedRe;
        this.selectedGlassesData.isPNearCheckedLe = this.selectedGlassesData.isPNearCheckedRe;
        this.selectedContactLensData.leftEye = this.selectedContactLensData.rightEye;
        this.selectedContactLensData.isPLeftEyeChecked = this.selectedContactLensData.isPRightEyeChecked;
        this.selectedPRData.s_le = this.selectedPRData.s_re;
        this.selectedPRData.i_le = this.selectedPRData.i_re;
        this.selectedPRData.n_le = this.selectedPRData.n_re;
        this.selectedPRData.t_le = this.selectedPRData.t_re;    
        this.visualAcuityCommentLe = this.visualAcuityCommentRe;
    }

}
