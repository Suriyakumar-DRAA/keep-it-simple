import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { BaseHttpServices } from './base-http.service';

@Injectable({
    providedIn: 'root' // This makes it available application-wide as a singleton
})
export class CommonService extends BaseHttpServices {
   
    private devUrl = environment.devUrl;

    logoutToken() {
        return this.get(environment.devUrl + '/keylime/api/token/logout');
    }
}
