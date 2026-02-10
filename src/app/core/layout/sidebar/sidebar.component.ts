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

    // Signal to track the active menu item
    activeItem = signal<string>('dashboard');

    // Menu items config based on the provided image
    mainMenuItems = [
        { id: 'dashboard', icon: 'bi-grid', label: 'Dashboard' },
        { id: 'add-building', icon: 'bi-building-add', label: 'Add Building' },
        { id: 'calendar', icon: 'bi-calendar3', label: 'Calendar' },
        { id: 'users-patients', icon: 'bi-people', label: 'Patients' },
        { id: 'add-house', icon: 'bi-house-add', label: 'Add House' },
        { id: 'analytics', icon: 'bi-graph-up', label: 'Analytics' },
        { id: 'help', icon: 'bi-question-circle', label: 'Help' },
    ];

    constructor() { }

    ngOnInit() {
    }

    selectItem(id: string, event: Event) {
        event.preventDefault();
        this.activeItem.set(id);
    }
}