import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// --- 2. SERVICE ---
@Injectable()
export class OPDPatientStatsService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

}