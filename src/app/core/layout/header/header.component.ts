import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, HostListener, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRole } from '@shared/model/role.model';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, FormsModule],
})
export class HeaderComponent {

    @Input({ required: true }) userRole!: UserRole;
    @Output() roleChange = new EventEmitter<UserRole>();
 currentDate: string="Oct 11, 2025";
    showRoleMenu = false;
    private elementRef = inject(ElementRef);

    constructor() { }

    ngOnInit() {
    }

    toggleRoleMenu(event?: Event) {
        if (event) event.stopPropagation();
        this.showRoleMenu = !this.showRoleMenu;
    }

    selectRole(role: UserRole) {
        this.roleChange.emit(role);
        this.showRoleMenu = false;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        // If the click is outside this component, or specifically outside the dropdown logic
        // we close the menu.
        if (this.showRoleMenu) {
            // Check if the click target is contained within the component
            const clickedInside = this.elementRef.nativeElement.contains(event.target);
            if (!clickedInside) {
                this.showRoleMenu = false;
            }
        }
    }
}