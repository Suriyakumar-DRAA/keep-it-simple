import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IUserDetail } from '@shared/model/user-detail.model';
import { BaseHttpServices } from '@shared/service/base-http.service';
import { DataShareService } from '@shared/service/data-share.service';
import { KeycloakService } from '@shared/service/keycloak.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
    providedIn: 'root'
})
export class AppInitService extends BaseHttpServices {

    private devUrl = environment.devUrl;

    private dataShareService = inject(DataShareService);
    private ngxPermissionsService = inject(NgxPermissionsService);

    initializeApp() {
        return new Promise<void>((resolve) => {
            const listOfModules: any[] = [];
            const listOfActions: any[] = [];
            const listOfRoles: any[] = [];
            this.get(`${this.devUrl}/keylime/api/init/details`).subscribe((res: any) => {
                this.ngxPermissionsService.flushPermissions();
                let userDetail: IUserDetail = res.data;
                this.dataShareService.setUserDetails(userDetail);
                if (userDetail.accessRole) {
                    listOfRoles.push(userDetail.accessRole.role);
                    for (const mItem of (userDetail.accessRole.modules || [])) {
                        listOfModules.push(mItem.module);
                        for (const action of (mItem.actions || [])) {
                            listOfActions.push(action);
                        }
                    }
                }
                // const consolidatedRoles = listOfActions.concat(listOfModules);
                this.ngxPermissionsService.loadPermissions(listOfActions);
                this.dataShareService.setModules(listOfModules);
                this.dataShareService.setRoles(listOfRoles);
                this.dataShareService.setActions(listOfActions);
                resolve();
            }, (error) => {
                console.error('Error initializing app:', error);
                resolve();
            });
        });
    }

    logOut() {
        this.get(`${this.devUrl}/keylime/api/token/logout`).subscribe((res: any) => {
            KeycloakService.auth.loggedIn = false;
            KeycloakService.auth.authz = null;
            const logoutUrl = KeycloakService.auth.logoutUrl;
            window.open(logoutUrl, '_blank', 'noopener noreferrer');
            const link = document.createElement('a');
            link.href = 'https://accounts.google.com/Logout';
            link.rel = 'noopener noreferrer';
            link.click();
        }, (error: any) => {
            console.error('Logout failed', error);
        });
    }
}