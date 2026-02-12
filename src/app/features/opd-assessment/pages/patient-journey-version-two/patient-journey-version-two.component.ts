import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-journey-version-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-journey-version-two.component.html',
  styleUrl: './patient-journey-version-two.component.scss'
})
export class PatientJourneyVersionTwoComponent {
isShowPatientJourney: boolean = false;

showPatientJourney() {
    this.isShowPatientJourney = !this.isShowPatientJourney;
}
}