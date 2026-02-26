import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

export interface Notification {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  autoHide?: boolean;
  autoHideDelay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataShareSvcService {

  constructor() { }

  open: any;
  close: any;
  openMessageModal: any;
  closeMessageModal: any;
  openConfirmationModal: any;
  closeConfirmationModal: any;
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
  /** This is used for branch selection */
  private selectedBranch = new BehaviorSubject<string>('');
  selectedBranchData = this.selectedBranch.asObservable();
  listOfActions: string[] = [];
  listOfModules: string[] = [];
  listOfRoles: string[] = [];
  rolesUpdated = new BehaviorSubject<boolean>(false);
  refreshRefSlip = new BehaviorSubject<boolean>(false);
  refreshPatientPhoto = new BehaviorSubject<boolean>(false);
  refreshRefundNote = new BehaviorSubject<boolean>(false);
  refreshInsuranceDocs = new BehaviorSubject<boolean>(false);
  refreshConsentForm = new BehaviorSubject<boolean>(false);
  refreshDischargeSummary = new BehaviorSubject<boolean>(false);
  refreshQueryDocument = new BehaviorSubject<boolean>(false);
  refreshDodDocument = new BehaviorSubject<boolean>(false);
  refreshRefundCrDocument = new BehaviorSubject<boolean>(false);
  refreshQrReader = new BehaviorSubject<boolean>(false);
  refreshGrnInvoice = new BehaviorSubject<boolean>(false);
  refreshGPrescription = new BehaviorSubject<boolean>(false);
  refreshPatientFrame = new BehaviorSubject<boolean>(false);
  refreshAckSlip = new BehaviorSubject<boolean>(false);
  refreshManualClaimDoc = new BehaviorSubject<boolean>(false);
  refreshRefundDoc = new BehaviorSubject<boolean>(false);
  refreshCreditApprovalDoc = new BehaviorSubject<boolean>(false);
  
  setSelectedBranch(branch: any) {
    this.selectedBranch.next(branch);
  }

  getListOfRoles() {
    return this.listOfRoles;
  }


  setListOfRoles(roles: Array<any>) {
    this.listOfRoles = roles;
    this.rolesUpdated.next(true);
  }

  getListOfActions() {
    return this.listOfActions;
  }
  setListOfActions(actions: Array<any>) {
    this.listOfActions = actions;
  }

  getListOfModles() {
    return this.listOfModules;
  }
  setListOfModles(modules: Array<any>) {
    this.listOfModules = modules;
  }

  /** This is used for branch selection */
  private hideBranch = new BehaviorSubject<boolean>(false);
  hideBranchData = this.hideBranch.asObservable();

  setHideBranch(status: boolean) {
    this.hideBranch.next(status);
  }

  /** This is used for patient selection */
  private selectedPatient = new BehaviorSubject<string>('');
  selectedPatientData = this.selectedPatient.asObservable();
  setSelectedPatient(patient: string) {
    this.selectedPatient.next(patient);
  }

  private createNewPatientMobile = new BehaviorSubject<any>({});
  createNewPatientData = this.createNewPatientMobile.asObservable();
  setCreateNewPatient(patientData: any) {
    this.createNewPatientMobile.next(patientData);
  }

  private showPatientMeta = new BehaviorSubject<{ show: boolean, checkInRequired: boolean, refresh: boolean }>({ show: false, checkInRequired: false, refresh: false });
  showPatientMetaData = this.showPatientMeta.asObservable();
  setShowPatientMeta(data: { show: boolean, checkInRequired: boolean, refresh: boolean }) {
    this.showPatientMeta.next(data);
  }

  /** This is used for show/hide patient info on header */
  private hidePatientInfo = new BehaviorSubject<boolean>(false);
  hidePatientInfoData = this.hidePatientInfo.asObservable();

  setHidePatientInfo(status: boolean) {
    this.hidePatientInfo.next(status);
  }

  private billingType = new BehaviorSubject<string>('');
  selectedBillingType = this.billingType.asObservable();

  setBillingType(billingType: string) {
    this.billingType.next(billingType);
  }

  private billDataFromPrescription: any = null;
  setBillDataFromPrescription(billData: any) {
    this.billDataFromPrescription = billData;
  }
  getBillDataFromPrescription(): any {
    return this.billDataFromPrescription;
  }

  private billDataFromInvestigation: any = null;
  setBillDataFromInvestigation(billData: any) {
    this.billDataFromInvestigation = billData;
  }
  getBillDataFromInvestigation(): any {
    return this.billDataFromInvestigation;
  }

  private notificationSubject = new BehaviorSubject<Notification | null>(null);

  get notification$(): Observable<Notification | null> {
    return this.notificationSubject.asObservable();
  }

  showNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
  }

  clearNotification(): void {
    this.notificationSubject.next(null);
  }

  currentDbView!: string;
  setCurrentDbView(view: string) {
    this.currentDbView = view;
  }

  getCurrentDbView(): string {
    return this.currentDbView;
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
