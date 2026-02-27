import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TimeLineData } from '@views/opd-assessment/model/patient-journey-vertical.model';
import { AssessmentService } from '@views/opd-assessment/services/assessment.service';

@Component({
  selector: 'app-patient-journey-vertical',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-journey-vertical.component.html',
  styleUrl: './patient-journey-vertical.component.scss'
})
export class PatientJourneyVerticalComponent {
   timelineData: TimeLineData[] = [
    {id:1, label: 'Reception', time: '5 min',groupName:'Jagadesh', status: 'completed', icon: 'assets/images/patient-journey/reception.png'},
    {id:2, label: 'AR/NCT', time: '15 min',groupName:'Jagadesh', status: 'completed', icon: 'assets/images/patient-journey/ar_nct.png' },
    {id:3, label: 'Optometrist', time: '10 min',groupName:'Jagadesh', status: 'completed', icon: 'assets/images/patient-journey/optom.png' },
    {id:4, label: 'Dilation', time: '12 min',groupName:'Jagadesh', status: 'current', icon: 'assets/images/patient-journey/dilation.png' },
    {id:5, label: 'Ophthalmologist', time: '12 min',groupName:'Dr.Jagadesh', status: 'pending', icon: 'assets/images/patient-journey/ophthal.png' },
    {id:6, label: 'Visit Completed', time: '5 min',groupName:'Jagadesh', status: 'pending', icon: 'assets/images/patient-journey/visit_completed.png'},
  ];
  currentStep: TimeLineData[] = [];
  totalTime!: string;
  private assessmentService = inject(AssessmentService);

  constructor() { }
  
  ngOnInit() {
    this.getCurrentStep();
    this.totalTime = "01:23 min"; 
  }

   getCurrentStep() {
    this.timelineData.forEach(step => {
      if(step.status === 'current') {
        this.currentStep.push(step);
      }
    })
   }

  closePatientJourney() {
    this.assessmentService.setHorizontalPatientJourney(false);
  }
}
