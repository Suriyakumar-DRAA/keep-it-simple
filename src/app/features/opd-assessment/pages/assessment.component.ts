import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrNo: string;
  statusTag: { type: string, label: string }[];
  chips: { type: string, label: string }[];
  time: string;
  active: boolean;
  image?: string;
  priority?: string;
  status?: string;
}

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
  providers: [DatePipe]
})
export class AssessmentComponent {
  today = new Date('2026-01-12'); // Mock date from Figma
  tabs = ['Initial Assessment', 'Diagnosis', 'Prescription', 'Procedure', 'Referral'];

  // Stats
  queueStats = [
    { count: 150, label: 'All', active: false },
    { count: '05', label: 'All OP', active: true },
    { count: 20, label: 'Not Arrived', active: false },
    { count: '04', label: 'Completed', active: false },
    { count: 20, label: 'Referrals', active: false },
    { count: 20, label: 'Unassigned', active: false },
    { count: 20, label: 'All Scheduled', active: false },
  ];

  // Patients
  patients: Patient[] = [
    {
      id: '1',
      name: 'Mrs. Geetha Padmanabhan (Female)',
      age: 38,
      gender: 'Female',
      mrNo: 'GBC/95000/192',
      statusTag: [{ type: 'open-blue', label: 'Optom' }, { type: 'open-light', label: 'E' }],
      chips: [{ type: 'review', label: 'Review' }, { type: 'free', label: 'Free' }],
      time: '02:43 min',
      active: true,
      priority: 'High',
      status: 'Pending'
    },
    {
      id: '2',
      name: 'Mr. Venkat (Male)',
      age: 45,
      gender: 'Male',
      mrNo: 'GBC/95001/193',
      statusTag: [{ type: 'open-blue', label: 'Optom' }, { type: 'open-light', label: 'E' }],
      chips: [{ type: 'review', label: 'Post Op' }, { type: 'free', label: 'Free' }],
      time: '02:43 min',
      active: false,
      status: 'Completed'
    },
    {
      id: '3',
      name: 'Mr. Ajay Chowdary (Male)',
      age: 29,
      gender: 'Male',
      mrNo: 'GBC/95002/194',
      statusTag: [{ type: 'open-blue', label: 'Optom' }, { type: 'open-light', label: 'E' }],
      chips: [{ type: 'new', label: 'New' }, { type: 'free', label: 'Free' }],
      time: '02:43 min',
      active: false
    },
     {
      id: '4',
      name: 'Mr. Silvian G (Male)',
      age: 52,
      gender: 'Male',
      mrNo: 'GBC/95003/195',
      statusTag: [{ type: 'open-blue', label: 'Optom' }, { type: 'open-light', label: 'E' }],
      chips: [{ type: 'review', label: 'Review' }, { type: 'free', label: 'Free' }],
      time: '02:43 min',
      active: false
    },
    {
      id: '5',
      name: 'Mrs. Swathi (Female)',
      age: 31,
      gender: 'Female',
      mrNo: 'GBC/95004/196',
      statusTag: [{ type: 'open-blue', label: 'Optom' }, { type: 'open-light', label: 'E' }],
      chips: [{ type: 'new', label: 'New' }, { type: 'free', label: 'Free' }],
      time: '02:43 min',
      active: false
    }
  ];

  selectedPatient = this.patients[0];

  // Right Side Data
  patientDetails = {
    ...this.selectedPatient,
    systemicHistory: 'Thyroid since 8 yrs.',
    previousDiagnosis: 'None',
    ophthalmicHistory: 'Dry Eye (Both)',
    allergies: 'Sulpha',
    appointmentType: 'Walk-in',
    occupation: 'Software Developer',
    dob: '26 Jan 2002',
    infectiousDisease: 'None',
    previousSurgery: 'None',
    visitReason: 'Follow up / Review',
    chiefComplaints: ['Burning sensation in both eyes.', 'Redness and irritation'],
    medication: [
        'Refresh Tears drops',
        'Morning - 2 drops each in BE',
        'Evening - 2 drops each in BE'
    ],
    followUp: 'After 2 weeks - 12 Jan 2026',
    findings: 'Normal'
  };

  leStats = {
      k1: '42.00 @ 180',
      k2: '41.20 @ 90',
      va: '6/6',
      near: 'N10',
      ph: '6/6',
      autoRef: 'Sph +1.00 | Cyl —0.50 | Axis 90',
      iop: '13 @ 3:46 PM',
      dryRef: '+0.50 | —0.50 X 90 (6/6)',
      nearAdd: '+1.75'
  };

   reStats = {
      k1: '42.00 @ 180',
      k2: '41.20 @ 90',
      va: '6/6',
      near: 'N10',
      ph: '6/6',
      autoRef: 'Sph +1.00 | Cyl —0.50 | Axis 90',
      iop: '13 @ 3:46 PM',
      dryRef: '+0.50 | —0.50 X 90 (6/6)',
      nearAdd: '+1.75'
  };
}