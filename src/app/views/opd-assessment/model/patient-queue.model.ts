import { ICase } from "./case.model";

export interface IPatientQueue {
  id: string;
  name: string;
  mr_no: string;
  phone?: string;
  gender: string;
  age: number;
  systemic_history?: string;
  ophthalmic_history?: string;
  previous_surgery?: string;
  previous_diagnosis?: string;
  allergies?: string;
  created_at?: string;
}

export type PatientWithCase = IPatientQueue & { case: ICase };