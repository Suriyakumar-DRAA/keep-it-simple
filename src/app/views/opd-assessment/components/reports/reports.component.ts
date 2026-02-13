import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@views/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { PDFViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    imports: [CommonModule, FormsModule,
        PDFViewerComponent],
    providers: []
})
export class ReportsComponent {
    selectedReport = signal<Report | null>(null);

    // Mock Data
    reports = signal<any[]>([
        {
            id: '1',
            report_name: 'OCT Scan - Macula',
            report_type: 'OCT',
            doctor_name: 'Dr. Ashwin Kumar',
            inference: 'Normal macular contour',
            status: 'Finalized',
            report_date: '12 Jan 2024',
            report_time: '10:30 AM',
            facility: 'Main Branch',
            pdfPath: 'assets/pdf/operation_theatre.pdf'
        },
        {
            id: '2',
            report_name: 'Visual Field Test',
            report_type: 'HFA',
            doctor_name: 'Dr. Ashwin Kumar',
            inference: 'Mild peripheral loss',
            status: 'Pending Review',
            report_date: '10 Jan 2024',
            report_time: '02:15 PM',
            facility: 'Gachibowli',
            pdfPath: 'assets/pdf/eye.pdf'
        },
        {
            id: '3',
            report_name: 'Fundus Photo',
            report_type: 'Imaging',
            doctor_name: 'Dr. Priya Raj',
            inference: 'No diabetic retinopathy',
            status: 'Finalized',
            report_date: '05 Jan 2024',
            report_time: '11:00 AM',
            facility: 'Main Branch',
            pdfPath: 'assets/pdf/operation_theatre.pdf'
        }
    ]);

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    ngOnInit() {
    }
}