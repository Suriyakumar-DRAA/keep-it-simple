import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root' // This makes it available application-wide as a singleton
})
export class CommonService {
    constructor(private http: HttpClient) {
    }
}
