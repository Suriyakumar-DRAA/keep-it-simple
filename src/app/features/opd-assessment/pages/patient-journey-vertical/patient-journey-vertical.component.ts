import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';

@Component({
  selector: 'app-patient-journey-vertical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-journey-vertical.component.html',
  styleUrl: './patient-journey-vertical.component.scss'
})
export class PatientJourneyVerticalComponent {
  @Output() close = new EventEmitter<void>();
  showPatientJourney!: boolean;
  constructor(private assessmentService: AssessmentService) { }

  openPatientjourney() {
    this.showPatientJourney = true;
  }

  closePatientJourney() {
    this.showPatientJourney = false;
  }

}
