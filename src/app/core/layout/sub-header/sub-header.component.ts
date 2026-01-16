import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../../shared/model/role.model';

@Component({
    selector: 'app-sub-header',
    standalone: true,
    templateUrl: './sub-header.component.html',
    styleUrls: ['./sub-header.component.scss'],
    imports: [CommonModule, FormsModule],
})
export class SubHeaderComponent {

    @Input() currentDate: string = 'Oct 11, 2025';

    constructor() { }

    ngOnInit() {
    }
}