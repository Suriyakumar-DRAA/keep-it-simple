import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientJourneyHorizontalComponent } from '../patient-journey-horizontal/patient-journey-horizontal.component';
import { PatientJourneyVerticalComponent } from '../patient-journey-vertical/patient-journey-vertical.component';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, PatientJourneyHorizontalComponent, PatientJourneyVerticalComponent],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent {
  selectedCard: string = "my_queue";
  showPatientJourneyHorizontal = false;
  showPatientJourneyVertical = false;

  setSelectedCard( selectedCardName: string) {
    this.selectedCard = selectedCardName;
  }

  openPatientJourneyHorizontal(): void {
    this.showPatientJourneyHorizontal = true;
    this.showPatientJourneyVertical = false;
  }

  openPatientJourneyVertical(): void {
    this.showPatientJourneyVertical = true;
    this.showPatientJourneyHorizontal = false;
  }

  closePatientJourney(): void {
    this.showPatientJourneyHorizontal = false;
    this.showPatientJourneyVertical = false;
  }
}
