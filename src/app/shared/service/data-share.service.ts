import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { signal } from '@angular/core';
import { IUserDetail } from '@shared/model/user-detail.model';

export interface Notification {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  autoHide?: boolean;
  autoHideDelay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  /** This is used for branch selection */
  private selectedBranch = new BehaviorSubject<string>('');
  selectedBranchData = this.selectedBranch.asObservable();

  modules = signal<any[]>([]);
  roles = signal<any[]>([]);
  actions = signal<any[]>([]);
  userDetails = signal<IUserDetail | null>(null);

  open: any;
  close: any;
  handleApiError(errorMessage: string, modalRef?: BsModalRef) {
    return (error: any) => {
      this.close();
      if (modalRef) {
        modalRef.hide();
      }
      this.showError(error?.error.message ? error.error.message : errorMessage);
      // this.openMessageModal({ message: error?.error.message ? error.error.message : errorMessage });
    }
  }

  getUserDetails() {
    return this.userDetails();
  }
  setUserDetails(details: IUserDetail) {
    this.userDetails.set(details);
  }

  getModules() {
    return this.modules();
  }
  setModules(modules: any[]) {
    this.modules.set(modules);
  }

  getRoles() {
    return this.roles();
  }
  setRoles(roles: any[]) {
    this.roles.set(roles);
  }

  getActions() {
    return this.actions();
  }
  setActions(actions: any[]) {
    this.actions.set(actions);
  }

  setSelectedBranch(branch: any) {
    this.selectedBranch.next(branch);
  }

  private notificationSubject = new BehaviorSubject<Notification | null>(null);

  showNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
  }


  showSuccess(message: string, autoHide = true, autoHideDelay = 2000): void {
    this.showNotification({
      message,
      type: 'success',
      autoHide,
      autoHideDelay
    });
  }

  showError(message: string, autoHide = true, autoHideDelay = 4000): void {
    this.close();
    this.showNotification({
      message,
      type: 'error',
      autoHide,
      autoHideDelay
    });
  }
}
