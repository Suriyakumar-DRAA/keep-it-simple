import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { ISidebarMenu } from '@shared/model/sidebar-menu.model';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
})
export class SidebarComponent {

    // Signal to track the active menu item
    activeItem = signal<string>('dashboard');
    private ngxPermissionsService = inject(NgxPermissionsService);

    // Menu items config based on the provided image
    mainMenuItems: Array<ISidebarMenu> = [];

    constructor() { }

    ngOnInit() {
        this.mainMenuItems = this.setMenuItems();
        this.activeItem.set('opd');
    }

    selectItem(id: string, event: Event) {
        event.preventDefault();
        this.activeItem.set(id);
    }

    setMenuItems(): Array<ISidebarMenu> {
        return [
            {
                id: 'opd',
                icon: 'bi-door-open',
                label: 'OPD',
                route: '/outpatients',
                permission: this.ngxPermissionsService.getPermission('EHR_OPD') ? true : false
            },
            {
                id: 'ipd',
                icon: 'bi-hospital',
                label: 'IPD',
                route: '/inpatients',
                permission: this.ngxPermissionsService.getPermission('EHR_IPD') ? true : false

            },
            {
                id: 'calendar',
                icon: 'bi-calendar3',
                label: 'Calendar',
                route: '/calendar',
                permission: this.ngxPermissionsService.getPermission('EHR_CALENDAR') ? true : false
            },
        ]
    }
}