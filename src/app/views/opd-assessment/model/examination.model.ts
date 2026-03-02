export interface IAppearance {
    phthisis_bulbi: boolean | null;
    anophthalmos: boolean | null;
    microphthalmos: boolean | null;
    artificial: boolean | null;
    proptosis: boolean | null;
    dystopia: boolean | null;
    injured: boolean | null;
    swollen: boolean | null;
    show_comments?: boolean;
    comments?: string;
}

export interface IInjury {
    nature_of_injury: string;
    open_globe_types: any;
    rupture_details: any;
    iofb_material: string;
    stone_location: string;
    closed_globe_types: Record<string, any>;
    lamellar_details: Record<string, any>;
    show_comments?: boolean;
    comments?: string;
}

export interface IAppendages {
    appendages_main: Record<string, boolean>;
    eyelids_Chalazion: boolean;
    eyelids_Ptosis: boolean;
    eyelids_Swelling: boolean;
    eyelids_Entropion: boolean;
    eyelids_Ectropion: boolean;
    eyelids_Mass: boolean;
    eyelids_Meibomitis: boolean;
    eyelashes_Trichiasis: boolean;
    eyelashes_Dystrichiasis: boolean;
    lacrimalSac_Swelling: boolean;
    lacrimalSac_Roplas: boolean;
    syringing_Syringing: boolean;
    show_comments?: boolean;
    comments?: string;
}

export interface IConjunctiva {
    conjunctiva_congestion: boolean | null;
    congestion_type: string;
    Tear: boolean | null;
    conjuctival_Bleb: boolean | null;
    sub_conjunctival_haemorrhage: boolean | null;
    foreign_body: boolean | null;
    follicles: boolean | null;
    papillae: boolean | null;
    pinguecula: boolean | null;
    pterygium: boolean | null;
    phlycten: boolean | null;
    discharge: boolean | null;
    show_comments?: boolean;
    comments?: string;
}

export interface ICornea {
    size: string;
    shapes: string;
    surfaces: Record<string, boolean>;
    stainings: string;
    corneal_sensation: string;
    schirmer1_mm: number;
    schirmer1_min: number;
    schirmer1_sec: number;
    schirmer2_mm: number;
    schirmer2_min: number;
    schirmer2_sec: number;
    show_comments: boolean;
    comments: string;
}

export interface IAnteriorChamber {
    depth: string;
    cells: boolean;
    cells_details: string;
    flare: boolean;
    flare_details: string;
    hypopyon: boolean;
    hypopyon_details: string;
    hyphaema: boolean;
    hyphaema_details: string;
    foreign_body: boolean;
    foreign_body_details: string;
    show_comments: boolean;
    comments: string;
}

export interface IPupil {
    shape: string;
    pupil_size: string;
    reaction_to_light_direct: string;
    reaction_to_light_consensual: string;
    rapd: boolean;
    show_comments: boolean;
    comments: string;
}

export interface IIris {
    shape: string;
    neovascularisation: boolean;
    synechiae: string;
    peripheral_iridotomy: boolean;
    show_comments: boolean;
    comments: string;
}

export interface ILens {
    nature: string;
    position: string;
    size: string;
    LOCS_grading?: any;
    show_comments: boolean;
    comments: string;
}

export interface IGonioscopy {
    superior: string[];
    inferior: string[];
    nasal: string[];
    temporal: string[];
    show_comments: boolean;
    comments: string;
}

export interface IFundus {
    media: string;
    media_details: string;
    pvd: string;
    optic_disc_size: string;
    disk_ratio: string;
    blood_vessels: string;
    blood_vessels_details: string;
    macula: any;
    foveal_reflex: string;
    foveal_reflex_details: string;
    vitreous: string;
    vitreous_details: string;
    retinal_detachment: string;
    retinal_detachment_details: string;
    peripheral_lesions: string;
    peripheral_lesions_details: string;
    fundus: string;
    show_comments: boolean;
    comments: string;
}