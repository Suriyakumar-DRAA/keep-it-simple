import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { PatientWithCase } from '../../model/patient.model';
import { AssessmentService } from '@views/opd-assessment/services/assessment.service';

@Component({
    selector: 'app-patient-queue',
    standalone: true,
    templateUrl: './patient-queue.component.html',
    styleUrls: ['./patient-queue.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class PatientQueueComponent {

    @Input() patients: PatientWithCase[] = [];
    @Input() selectedPatientId: string | null = null;
    @Input() queueLabel: string = 'My Queue';
    @Output() selectPatient = new EventEmitter<string>();

    private assessmentService = inject(AssessmentService);

    visiblePatientQueue = this.assessmentService.getVisiblePatientQueue();

    constructor() {
    }

    ngOnInit() {
    }

    // Refactored Shortcut: Standard window keydown listener
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // Check for Ctrl+B using code (physical key) or key (character) for robustness
        if (event.ctrlKey && (event.code === 'KeyB' || event.key.toLowerCase() === 'b')) {
            event.preventDefault(); // Prevent default browser behavior
            this.onToggle();
        }
    }

    onToggle() {
        const currentState = this.assessmentService.getVisiblePatientQueue();
        this.assessmentService.setVisiblePatientQueue(!currentState());
    }

    getStatusColor(status: string | undefined): string {
        switch (status?.toLowerCase()) {
            case 'new': return 'bg-teal-100';
            case 'free': return 'bg-emerald-100';
            case 'paid': return 'bg-amber-100';
            case 'review': return 'bg-violet-100';
            default: return 'bg-gray-100';
        }
    }

    getAppointmentTypeColor(type: string | undefined): string {
        switch (type?.toLowerCase()) {
            case 'free': return 'bg-emerald-100';
            case 'paid': return 'bg-amber-100';
            default: return 'bg-gray-100';
        }
    }

    getTimeDiff(date: string | undefined): string {
         if (!date) {
            return '';
        }
        const now = new Date();
        const visitDate = new Date(date);
        const diffMinutes = Math.floor((now.getTime() - visitDate.getTime()) / 60000);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        if (hours > 0) return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} m`;
        return `${String(minutes).padStart(2, '0')} m`;
    }
}