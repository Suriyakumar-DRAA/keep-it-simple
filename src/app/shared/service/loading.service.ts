import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private pendingRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  
  // Observable for components to subscribe to
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  requestStarted(): void {
    this.pendingRequests++;
    this.updateLoadingState();
  }


  requestCompleted(): void {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }
    this.updateLoadingState();
  }

  get isLoading(): boolean {
    return this.isLoadingSubject.value;
  }

  private updateLoadingState(): void {
    this.isLoadingSubject.next(this.pendingRequests > 0);
  }
}
