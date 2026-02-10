import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Inject, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import { IPatient } from '../../model/patient.model';
import { ICase } from '../../model/case.model';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';

@Component({
    selector: 'app-split-window',
    standalone: true,
    templateUrl: './split-window.component.html',
    styleUrls: ['./split-window.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class SplitWindowComponent {

    leftExpanded: boolean = true;
    rightExpanded: boolean = false;
    selectedDateTab: string = '01-Jan-2026';
    
    dateTabs = [
        '01-Jan-2026',
        '30-Dec-2025',
        '25-Dec-2025',
        '20-Dec-2025',
        '15-Dec-2025'
    ];
    
    private assessmentService = inject(AssessmentService);

    constructor() {
        this.setupKeyboardShortcuts();
    }

    ngOnInit() {
    }

    /**
  * Toggle left panel expansion
  */
    toggleLeftPanel(): void {
        if (this.leftExpanded) {
            // Reset to 50-50
            this.leftExpanded = false;
            this.rightExpanded = false;
        } else {
            // Expand left to 90%
            this.leftExpanded = true;
            this.rightExpanded = false;
        }
    }

    /**
     * Toggle right panel expansion
     */
    toggleRightPanel(): void {
        if (this.rightExpanded) {
            // Reset to 50-50
            this.rightExpanded = false;
            this.leftExpanded = false;
        } else {
            // Expand right to 90%
            this.rightExpanded = true;
            this.leftExpanded = false;
        }
    }

    /**
     * Expand right panel when collapsed left is clicked
     */
    expandRightFromLeft(): void {
        if (!this.leftExpanded) {
            this.toggleRightPanel();
        }
    }

    /**
     * Expand left panel when collapsed right is clicked
     */
    expandLeftFromRight(): void {
        if (!this.rightExpanded) {
            this.toggleLeftPanel();
        }
    }

    /**
     * Reset both panels to 50-50
     */
    resetPanels(): void {
        this.leftExpanded = false;
        this.rightExpanded = false;
    }

    /**
     * Get CSS classes for left panel
     */
    getLeftPanelClasses(): { [key: string]: boolean } {
        return {
            'panel': true,
            'left-panel': true,
            'expanded': this.leftExpanded,
            'collapsed': this.rightExpanded
        };
    }

    /**
     * Get CSS classes for right panel
     */
    getRightPanelClasses(): { [key: string]: boolean } {
        return {
            'panel': true,
            'right-panel': true,
            'expanded': this.rightExpanded,
            'collapsed': this.leftExpanded
        };
    }

    /**
     * Get icon for left expand button
     */
    getLeftExpandIcon(): string {
        return this.leftExpanded
            ? 'bi bi-layout-sidebar-inset'
            : 'bi bi-layout-split';
    }

    /**
     * Get icon for right expand button
     */
    getRightExpandIcon(): string {
        return this.rightExpanded
            ? 'bi bi-layout-sidebar-inset-reverse'
            : 'bi bi-layout-split';
    }

    /**
     * Get tooltip for left expand button
     */
    getLeftExpandTooltip(): string {
        return this.leftExpanded
            ? 'Collapse Panel'
            : 'Expand Panel';
    }

    /**
     * Get tooltip for right expand button
     */
    getRightExpandTooltip(): string {
        return this.rightExpanded
            ? 'Collapse Panel'
            : 'Expand Panel';
    }

    /**
     * Select date tab
     */
    selectDateTab(date: string): void {
        this.selectedDateTab = date;
    }

    /**
     * Setup keyboard shortcuts
     */
    private setupKeyboardShortcuts(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', (e: KeyboardEvent) => {
                // Ctrl + Left Arrow - Toggle left panel
                if (e.ctrlKey && e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.toggleLeftPanel();
                }

                // Ctrl + Right Arrow - Toggle right panel
                if (e.ctrlKey && e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.toggleRightPanel();
                }

                // ESC - Reset to 50-50
                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.resetPanels();
                }
            });
        }
    }

    ngOnDestroy(): void {
        // Clean up event listeners if needed
        if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', () => { });
        }
    }
}