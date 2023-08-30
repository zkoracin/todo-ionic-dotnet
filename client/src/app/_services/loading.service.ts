import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;
  private loadingSource = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSource.asObservable();

  constructor() { }

  addLoadingRequest() {
    this.loadingCount++;
    this.loadingSource.next(true);
  }

  removeLoadingRequest() {
    this.loadingCount--;
    if (this.loadingCount < 1) {
      this.loadingSource.next(false);
    }
  }
}
