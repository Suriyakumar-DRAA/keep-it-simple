import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// --- 2. SERVICE ---
@Injectable({
  providedIn: 'root' // This ensures a single shared instance (singleton)
})
export class AssessmentService {

    private apiUrl = environment.apiUrl;
    private visiblePatientQueue = signal(true);
    
    private horizontalPatientJourney = signal(false);
    private verticalPatientJourney = signal(false);

    constructor(private http: HttpClient) {
    }

    getVisiblePatientQueue() {
        return this.visiblePatientQueue.asReadonly();
    }

    setVisiblePatientQueue(visible: boolean) {
        this.visiblePatientQueue.set(visible);
    }

    getHorizontalPatientJourney() {
        return this.horizontalPatientJourney.asReadonly();
    }

    setHorizontalPatientJourney(visible: boolean) {
        this.horizontalPatientJourney.set(visible);
    }   
    
    getVerticalPatientJourney() {
        return this.verticalPatientJourney.asReadonly();
    }

    setVerticalPatientJourney(visible: boolean) {
        this.verticalPatientJourney.set(visible);
    }
}