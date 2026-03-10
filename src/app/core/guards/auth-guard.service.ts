import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataShareService } from '@shared/service/data-share.service';
import { ACTIONS } from '@shared/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    private dataShareService = inject(DataShareService);

    constructor(private _route: Router) { }

    async canActivate(_routerState: ActivatedRouteSnapshot) {
        let routeAccess;
        let currentPath = _routerState.routeConfig?.path
        let listOfRoles: any = new Set(this.dataShareService.getRoles());
        let listOfActions: any = new Set(this.dataShareService.getActions());
        if ((listOfActions)) {
            if (currentPath === 'outpatients' && (listOfActions.has(ACTIONS.EHR_OPD))) {
                routeAccess = true;
            } else if (currentPath === 'inpatients' && (listOfActions.has(ACTIONS.EHR_IPD))) {
                routeAccess = true;
            } else if (currentPath === 'calendar' && (listOfActions.has(ACTIONS.EHR_CALENDAR))) {
                routeAccess = true;
            } else {
                routeAccess = false;
            }
        } else {
            routeAccess = false;
        }
        if (!routeAccess) {
            this._route.navigate(['/forbidden']);
            routeAccess = false;
        }
        return routeAccess;
    }

    async redirectPath(_routerState: ActivatedRouteSnapshot) {
        let redirectTo = '/forbidden';
        this._route.navigate([redirectTo]);
    }
}
