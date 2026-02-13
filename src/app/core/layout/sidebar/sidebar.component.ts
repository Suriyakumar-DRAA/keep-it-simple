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
        {id:'opd', icon : 'bi-door-open', label: 'OPD'},
        {id:'ipd', icon : 'bi-hospital', label: 'IPD' },
        { id: 'calendar', icon: 'bi-calendar3', label: 'Calendar' },
        
    ];

    constructor() { }

    ngOnInit() {
        this.activeItem.set('opd')
    }

    selectItem(id: string, event: Event) {
        event.preventDefault();
        this.activeItem.set(id);
    }
}