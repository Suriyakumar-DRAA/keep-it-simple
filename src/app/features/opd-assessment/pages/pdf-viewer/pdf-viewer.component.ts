import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, Inject, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssessmentService } from '@features/opd-assessment/services/assessment.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';
import * as pdfjsLib from 'pdfjs-dist';

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = `/assets/pdfjs/pdf.worker.min.mjs`;

@Component({
    selector: 'app-pdf-viewer',
    standalone: true,
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.scss'],
    imports: [CommonModule, FormsModule],
    providers: []
})
export class PDFViewerComponent {
    @ViewChild('mainCanvas', { static: false }) mainCanvas!: ElementRef<HTMLCanvasElement>;

    @Input({ required: true }) report!: any;
    @Input({ required: true }) patientName!: string;
    @Input({ required: true }) patientAge!: number;
    @Input({ required: true }) patientGender!: string;
    @Output() close = new EventEmitter<void>();

    currentPage = signal(1);
    pdfDoc: any;
    totalPages = 0;
    pages: number[] = [];
    selectedPage = 1;
    // pdfSrc = '/assets/pdf/patient_note.pdf';
    pdfSrc = '/assets/pdf/operation_theatre.pdf';

    private assessmentService = inject(AssessmentService);

    constructor() {
    }

    async ngAfterViewInit() {
        setTimeout(async () => {
            await this.loadPdf();
        })
    }

    ngOnInit() {
    }

    async loadPdf() {
        const loadingTask = pdfjsLib.getDocument(this.pdfSrc);
        this.pdfDoc = await loadingTask.promise;

        this.totalPages = this.pdfDoc.numPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        this.renderPage(this.selectedPage);
        this.renderThumbnails();
    }

    async renderPage(pageNumber: number) {
        this.selectedPage = pageNumber;

        const page = await this.pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 0.8 });

        const canvas = this.mainCanvas.nativeElement;
        const ctx = canvas.getContext('2d')!;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;
    }

    async renderThumbnails() {
        for (let pageNum of this.pages) {
            const page = await this.pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: 0.25 });

            const canvas = document.getElementById('thumb-' + pageNum) as HTMLCanvasElement;
            const ctx = canvas.getContext('2d')!;

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: ctx, viewport }).promise;
        }
    }
}