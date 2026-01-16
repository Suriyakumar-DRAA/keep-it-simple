export interface ICase {
  id: string;
  patient_id: string;
  visit_date: string;
  status: string;
  appointment_type: string;
  patient_referral?: string;
}
