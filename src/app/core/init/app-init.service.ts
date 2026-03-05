import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { IUserDetail } from '@shared/model/user-detail.model';
import { BaseHttpServices } from '@shared/service/base-http.service';
import { DataShareService } from '@shared/service/data-share.service';
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
            this.get(`${this.devUrl}/keylime/api/init/details`).subscribe((res: any) => {
                this.ngxPermissionsService.flushPermissions();
                debugger
                let userDetail: IUserDetail = res.data;
                this.dataShareService.setUserDetails(userDetail);
                if (userDetail.accessRole) {
                    for (const mItem of (userDetail.accessRole.modules || [])) {
                        listOfModules.push(mItem.module);
                        for (const action of (mItem.actions || [])) {
                            listOfActions.push(action);
                        }
                    }
                }
                const consolidatedRoles = listOfActions.concat(listOfModules);
                this.ngxPermissionsService.loadPermissions(consolidatedRoles);
                this.dataShareService.setModules(listOfModules);
                this.dataShareService.setRoles(consolidatedRoles);
                this.dataShareService.setActions(listOfActions);
                resolve();
            }, (error) => {
                console.error('Error initializing app:', error);
                resolve();
            });
        });
    }
}

