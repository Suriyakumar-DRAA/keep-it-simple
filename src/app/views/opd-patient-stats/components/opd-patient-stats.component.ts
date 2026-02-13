import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';

@Component({
    selector: 'app-opd-patient-stats',
    standalone: true,
    templateUrl: './opd-patient-stats.component.html',
    styleUrls: ['./opd-patient-stats.component.scss'],
    imports: [CommonModule, FormsModule],
})
export class OPDPatientStatsComponent {

    @Input({ required: true }) selectedQueue!: string;
    @Output() selectQueue = new EventEmitter<string>();

    queueItems = [
        { count: '10', label: 'My Appointments' },
        { count: '02', label: 'My Queue' },
        { count: '04', label: 'Completed' },
        { count: '20', label: 'Referrals' },
        { count: '', label: 'My Calendar' },
    ];

    constructor() { }

    ngOnInit() {
    }
}