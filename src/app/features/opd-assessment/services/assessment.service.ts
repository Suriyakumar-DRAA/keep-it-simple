import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// --- 2. SERVICE ---
@Injectable({
  providedIn: 'root' // This ensures a single shared instance (singleton)
})
export class AssessmentService {

    private apiUrl = environment.apiUrl;
    private visiblePatientQueue = signal(true);

    constructor(private http: HttpClient) {
    }

    getVisiblePatientQueue() {
        return this.visiblePatientQueue.asReadonly();
    }

    setVisiblePatientQueue(visible: boolean) {
        this.visiblePatientQueue.set(visible);
    }
}