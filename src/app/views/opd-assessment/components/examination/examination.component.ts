import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAnteriorChamber, IAppearance, IConjunctiva, ICornea, IInjury } from '@views/opd-assessment/model/examination.model';
import { AssessmentService } from '@views/opd-assessment/services/assessment.service';
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
    expandedSections = new Set<string>(['appearance']);
    activeSection: string = 'Appearance';

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }

    // Define sections for mapping in template to avoid repetition
    sections: any[] = [
        { id: 'appearance', label: 'Appearance', statusKey: 'appearance_status', notesKey: 'appearance_notes' },
        { id: 'injury', label: 'Injury', statusKey: 'injury_status', notesKey: 'injury_notes' },
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

    // Appearance
    appearanceFields = [
        { key: 'phthisis_bulbi', label: 'Phthisis Bulbi' },
        { key: 'anophthalmos', label: 'Anophthalmos' },
        { key: 'microphthalmos', label: 'Microphthalmos' },
        { key: 'artificial', label: 'Artificial' },
        { key: 'proptosis', label: 'Proptosis' },
        { key: 'dystopia', label: 'Dystopia' },
        { key: 'injured', label: 'Injured' },
        { key: 'swollen', label: 'Swollen' }
    ];

    // injuryForm
    injuryOpenGlobe = ['Rupture', 'Penetrating', 'IOFB', 'Perforating', 'Mixed'];
    injuryClosedGlobe = ['Contusion', 'Lamellar Laceration', 'Superficial Foreign Body', 'Mixed'];
    injuryRuptureDetails = ['Endophthalmitis', 'Panophthalmitis'];
    injuryInvolvementDetails = [
        'External (Limited to Bulbar Conjunctiva, Sclera, Cornea)',
        'Anterior Segment (Involving Structures Internal to Cornea like AC, Lens, Posterior Capsule, Pars Plicata)',
        'Structures Posterior to Posterior Lens'
    ];
    injuryIOFBMaterial = ['Pellet', 'Stone', 'Vegetative', 'Non Metallic', 'Glass'];
    injuryStoneLocation = [
        'Isolated to Cornea (Including Coreo Scleral Limbus)',
        'Corneo Scleral Limbus to a point 5MM Posterior to Sclera',
        'Posterior to Anterior 5MM of Sclera'
    ];

    // appendagesForm
    appendagesMain = ['Eyelids', 'Eyelashes', 'Lacrimal Sac', 'Syringing'];
    eyelidOptions = ['Chalazion', 'Ptosis', 'Swelling', 'Entropion', 'Ectropion', 'Mass', 'Meibomitis'];
    eyelashOptions = ['Trichiasis', 'Dystrichiasis'];
    lacrimalSacOptions = ['Swelling', 'Roplas'];
    syringingOptions = ['Syringing'];


    // conjunctivaForm
    conjunctivaOptions = [
        { label: 'Congestion', key: 'conjunctiva_congestion' },
        { label: 'Tear', key: 'Tear' },
        { label: 'Conjunctival Bleb', key: 'conjuctival_Bleb' },
        { label: 'Haemorrhage', key: 'sub_conjunctival_haemorrhage' },
        { label: 'Foreign Body', key: 'foreign_body' },
        { label: 'Follicles', key: 'follicles' },
        { label: 'Papillae', key: 'papillae' },
        { label: 'Pinguecula', key: 'pinguecula' },
        { label: 'Pterygium', key: 'pterygium' },
        { label: 'Phlycten', key: 'phlycten' },
        { label: 'Discharge', key: 'discharge' }
    ];
    conjunctivaCongestion: string[] = ['Circumcorneal', 'Ciliary', 'Conjunctival', 'Mixed'];

    // cormeaForm
    sizes = ['Normal', 'Micro', 'Macro'];
    shapes = ['Normal', 'Irregular', 'Keratoconus', 'Keratoglobus'];
    surfaces = ['Normal', 'Epi defect', 'Thinning', 'Scarring', 'Vascularisation', 'Degeneration', 'Dystrophy',
        'Foreign body', 'Tear', 'KP', 'Opacity', 'Ulcer', 'Suture', 'Graft', 'Contact Lens', "Edema"];
    stainings = ['Normal', 'Punctate', 'Negative'];
    cornealSensationOptions = ['Normal', 'Absent', 'Reduced'];

    // anteriorChamberForm
    acOptions = [
        { label: 'Cells', key: 'cells', detailsKey: 'cells_details' },
        { label: 'Flare', key: 'flare', detailsKey: 'flare_details' },
        { label: 'Hypopyon', key: 'hypopyon', detailsKey: 'hypopyon_details' },
        { label: 'Hyphaema', key: 'hyphaema', detailsKey: 'hyphaema_details' },
        { label: 'Foreign Body', key: 'foreign_body', detailsKey: 'foreign_body_details' }
    ];
    depthOptions = ['Normal', 'Shallow', 'Deep'];

    // pupilForm
    pupilShape = ['Round', 'Eccentric', 'Irregular', 'Oval', 'Polycoria'];
    pupilDirect = ['Normal', 'Sluggish', 'Absent'];
    pupilReaction = ['Brisk', 'Sluggish', 'Fixed']
    pupilConsensual = ['Normal', 'Sluggish', 'Absent'];

    // IrisForm
    irisShapes = ['Normal', 'Defects'];
    irisSynechiaeTypes = ['No', 'Anterior', 'Posterior'];

    // lensForm
    lensNatures = ['Clear', 'Cataract', 'Pseudophakia', 'Aphakia'];
    lensPositions = ['Central', 'Decentered', 'Subluxated'];
    lensSizes = ['Normal', 'Swollen', 'Absorbed', 'Micro'];

    gonioOptions = ['Select', 'Grade 0', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Closed', 'Slit'];

    // fundusForm
    cdRatioOptions = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'];
    maculaOptions = [
        'Foveal Reflex', 'Hard Exudates', 'Microaneurysm', 'Hemorrhages',
        'Subretinal Hemorrhages', 'Scar', 'Atrophic area', 'Pigment Alteration',
        'Drusen', 'Subretinal Fluid', 'Cystoid', 'Thickening', 'Whitening',
        'Cotton Wool Spots', 'Pigment Epithelial Detachment', 'Altered Foveal Reflex',
        'Vascular Abnormalities', 'Pigmentary Changes', 'Epiretinal Membrane',
        'FTMH', 'Lamellar Hole', 'ILM Striae', 'White Dots', 'Yellow Flecks', 'Cherry Red Spot'
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

    // Appearance
    appearanceRightSideData: IAppearance = {
        phthisis_bulbi: false,
        anophthalmos: false,
        microphthalmos: false,
        artificial: false,
        proptosis: false,
        dystopia: false,
        injured: false,
        swollen: false,
        show_comments: false,
        comments: ''
    };

    appearanceLeftSideData: IAppearance = {
        phthisis_bulbi: false,
        anophthalmos: false,
        microphthalmos: false,
        artificial: false,
        proptosis: false,
        dystopia: false,
        injured: false,
        swollen: false,
        show_comments: false,
        comments: ''
    };

    // Injury
    injuryLeftSideData: IInjury = {
        nature_of_injury: '',
        open_globe_types: {},
        rupture_details: {},
        iofb_material: '',
        stone_location: '',
        closed_globe_types: {},
        lamellar_details: {},
        show_comments: false,
        comments: ''
    };

    injuryRightSideData: IInjury = {
        nature_of_injury: '',
        open_globe_types: {},
        rupture_details: {},
        iofb_material: '',
        stone_location: '',
        closed_globe_types: {},
        lamellar_details: {},
        show_comments: false,
        comments: ''
    }

    // Appendages
    appendagesRightSideData = {
        appendages_main: {
            'Eyelids': false,
            'Eyelashes': false,
            'Lacrimal Sac': false,
            'Syringing': false
        },
        eyelids_Chalazion: false,
        eyelids_Ptosis: false,
        eyelids_Swelling: false,
        eyelids_Entropion: false,
        eyelids_Ectropion: false,
        eyelids_Mass: false,
        eyelids_Meibomitis: false,
        eyelashes_Trichiasis: false,
        eyelashes_Dystrichiasis: false,
        lacrimalSac_Swelling: false,
        lacrimalSac_Roplas: false,
        syringing_Syringing: false,
        show_comments: false,
        comments: ''
    };

    appendagesLeftSideData = {
        appendages_main: {
            'Eyelids': false,
            'Eyelashes': false,
            'Lacrimal Sac': false,
            'Syringing': false
        },
        eyelids_Chalazion: false,
        eyelids_Ptosis: false,
        eyelids_Swelling: false,
        eyelids_Entropion: false,
        eyelids_Ectropion: false,
        eyelids_Mass: false,
        eyelids_Meibomitis: false,
        eyelashes_Trichiasis: false,
        eyelashes_Dystrichiasis: false,
        lacrimalSac_Swelling: false,
        lacrimalSac_Roplas: false,
        syringing_Syringing: false,
        show_comments: false,
        comments: ''
    };

    // Conjunctiva
    conjunctivaRightSideData: IConjunctiva = {
        conjunctiva_congestion: false,
        congestion_type: '',
        Tear: false,
        conjuctival_Bleb: false,
        sub_conjunctival_haemorrhage: false,
        foreign_body: false,
        follicles: false,
        papillae: false,
        pinguecula: false,
        pterygium: false,
        phlycten: false,
        discharge: false,
        show_comments: false,
        comments: ''
    };

    conjunctivaLeftSideData: IConjunctiva = {
        conjunctiva_congestion: false,
        congestion_type: '',
        Tear: false,
        conjuctival_Bleb: false,
        sub_conjunctival_haemorrhage: false,
        foreign_body: false,
        follicles: false,
        papillae: false,
        pinguecula: false,
        pterygium: false,
        phlycten: false,
        discharge: false,
        show_comments: false,
        comments: ''
    };

    //scleraForm
    corneaRightSideData: ICornea = {
        size: 'Normal',
        shapes: 'Normal',
        surfaces: {
            Normal: true, 'Epi defect': false, Thinning: false, Scarring: false,
            Vascularisation: false, Degeneration: false, Dystrophy: false,
            'Foreign body': false, Tear: false, KP: false, Opacity: false,
            Ulcer: false, Suture: false, Graft: false, 'Contact Lens': false, Edema: false
        },
        stainings: 'Normal',
        corneal_sensation: 'Normal',
        schirmer1_mm: 0, schirmer1_min: 0, schirmer1_sec: 0,
        schirmer2_mm: 0, schirmer2_min: 0, schirmer2_sec: 0,
        show_comments: false,
        comments: ''
    };

    corneaLeftSideData: ICornea = {
        size: 'Normal',
        shapes: 'Normal',
        surfaces: {
            Normal: true, 'Epi defect': false, Thinning: false, Scarring: false,
            Vascularisation: false, Degeneration: false, Dystrophy: false,
            'Foreign body': false, Tear: false, KP: false, Opacity: false,
            Ulcer: false, Suture: false, Graft: false, 'Contact Lens': false, Edema: false
        },
        stainings: 'Normal',
        corneal_sensation: 'Normal',
        schirmer1_mm: 0, schirmer1_min: 0, schirmer1_sec: 0,
        schirmer2_mm: 0, schirmer2_min: 0, schirmer2_sec: 0,
        show_comments: false,
        comments: ''
    };


    createInjuryObject() {
        return {
            natureOfInjury: '',
            openGlobeTypes: {},
            ruptureDetails: {},
            iofbMaterial: '',
            stoneLocation: '',
            closedGlobeTypes: {},
            lamellarDetails: {},
            showComments: false,
            comments: ''
        };
    }



    createPupilObject() {
        return {
            pupilShape: 'Round',
            pupilSize: null,
            reactionDirect: 'Normal',
            reactionConsensual: 'Normal',
            rapd: false,
            showComments: false,
            comments: ''
        };
    }

    pupilRightSideData = this.createPupilObject();
    pupilLeftSideData = this.createPupilObject();

    // --- Fundus Form Logic ---
    createIrisObject() {
        return {
            irisShape: 'Normal',
            irisNVI: false,
            irisSynechiae: 'No',
            irisPI: false,
            showComments: false,
            comments: ''
        };
    }

    irisLeftSideData = this.createIrisObject();
    irisRightSideData = this.createIrisObject();

    createLensObject() {
        return {
            lensNature: 'Clear',
            lensPosition: 'Central',
            lensSize: 'Normal',
            showComments: false,
            comments: ''
        };
    }

    lensLeftSideData = this.createLensObject();
    lensRightSideData = this.createLensObject();

    createAnteriorChamberObject() {
        return {
            acDepth: 'Normal',
            ac_Cells: false, ac_Cells_details: '',
            ac_Flare: false, ac_Flare_details: '',
            ac_Hypopyon: false, ac_Hypopyon_details: '',
            ac_Hyphaema: false, ac_Hyphaema_details: '',
            ac_ForeignBody: false, ac_ForeignBody_details: '',
            showComments: false,
            comments: ''
        };
    }

    anteriorChamberRightSideData: IAnteriorChamber = {
        depth: 'Normal',
        cells: false, cells_details: '',
        flare: false, flare_details: '',
        hypopyon: false, hypopyon_details: '',
        hyphaema: false, hyphaema_details: '',
        foreign_body: false, foreign_body_details: '',
        show_comments: false,
        comments: ''
    };
    anteriorChamberLeftSideData: IAnteriorChamber = {

        depth: 'Normal',
        cells: false, cells_details: '',
        flare: false, flare_details: '',
        hypopyon: false, hypopyon_details: '',
        hyphaema: false, hyphaema_details: '',
        foreign_body: false, foreign_body_details: '',
        show_comments: false,
        comments: ''
    };

    // Optional: Function to handle the "Normal" button click at the top of the form
    setFundusNormal(data: any) {
        data.fundusMediaSelect = 'Clear';
        data.fundusPvd = 'Absent';
        data.opticDiscSize = 'Normal';
        data.cdRatio = '0.3'; // or whatever your clinical baseline is
        data.bloodVesselsSelect = 'Normal';
        data.maculaLesions = []; // clears macula chips
        data.fovealReflex = 'Present';
        data.vitreousSelect = 'Clear';
        data.retinalDetachmentSelect = 'Absent';
        data.peripheralLesionsSelect = 'Absent';
        data.fundusText = 'Normal limits';
    }

    copyReToLe() {
        this.appearanceLeftSideData = {
            ...this.appearanceRightSideData,
            show_comments: this.appearanceLeftSideData.show_comments
        };

        this.conjunctivaLeftSideData = {
            ...this.conjunctivaRightSideData,
            show_comments: this.conjunctivaLeftSideData.show_comments
        };

        this.corneaLeftSideData = {
            ...this.corneaRightSideData,
            show_comments: this.corneaLeftSideData.show_comments
        };

        this.injuryLeftSideData = {
            ...this.injuryRightSideData,
            show_comments: this.injuryLeftSideData.show_comments
        };

        this.appendagesLeftSideData = {
            ...this.appendagesRightSideData,
            show_comments: this.appendagesLeftSideData.show_comments
        };

        this.irisLeftSideData = {
            ...this.irisRightSideData,
            showComments: this.irisLeftSideData.showComments
        };

        this.lensLeftSideData = {
            ...this.lensRightSideData,
            showComments: this.lensLeftSideData.showComments
        };

        this.anteriorChamberLeftSideData = {
            ...this.anteriorChamberRightSideData,
            show_comments: this.anteriorChamberLeftSideData.show_comments
        };

        this.pupilLeftSideData = {
            ...this.pupilRightSideData,
            showComments: this.pupilLeftSideData.showComments
        };
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

    reData: EyeData = { size: 'Macro', shape: 'Normal', surface: 'Normal', staining: 'Normal' };
    leData: EyeData = { size: 'Macro', shape: 'Normal', surface: 'Normal', staining: 'Normal' };

    mmRange = Array.from({ length: 12 }, (_, i) => i); // 0 to 35
    timeRange = Array.from({ length: 12 }, (_, i) => i.toString().padStart(2, '0')); // 00 to 60

}