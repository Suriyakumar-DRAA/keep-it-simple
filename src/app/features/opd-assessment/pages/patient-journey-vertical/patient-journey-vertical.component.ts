import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';

@Component({
  selector: 'app-patient-journey-vertical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-journey-vertical.component.html',
  styleUrl: './patient-journey-vertical.component.scss'
})
export class PatientJourneyVerticalComponent {

  private assessmentService = inject(AssessmentService);

  constructor() { }

  closePatientJourney() {
    this.assessmentService.setHorizontalPatientJourney(false);
  }
}
