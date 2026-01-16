import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [CommonModule, FormsModule],
})
export class SidebarComponent {

    @Input({ required: true }) selectedQueue!: string;
    @Output() selectQueue = new EventEmitter<string>();

    queueItems = [
        { count: '150', label: 'All' },
        { count: '07', label: 'My Queue' },
        { count: '20', label: 'All Scheduled' },
        { count: '05', label: 'All OP' },
        { count: '04', label: 'Completed' },
        { count: '20', label: 'Referrals' },
        { count: '20', label: 'Unassigned' },
        { count: '20', label: 'Not Arrived' },
    ];

    constructor() { }

    ngOnInit() {
    }
}