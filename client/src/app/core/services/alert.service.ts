import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private AlertSubject = new Subject<any>();
  private id = 0;
  private defaultTimeoutInSeconds = 6;

  constructor() { }

  showErrorAlert(text: string, timeoutInSeconds?: number) {
    this.sendAlert(text, 'danger', timeoutInSeconds);
  }

  showSuccessAlert(text: string, timeoutInSeconds?: number) {
    this.sendAlert(text, 'success', timeoutInSeconds);
  }

  showInfoAlert(text: string, timeoutInSeconds?: number) {
    this.sendAlert(text, 'info', timeoutInSeconds);
  }

  showWarningAlert(text: string, timeoutInSeconds?: number) {
    this.sendAlert(text, 'warning', timeoutInSeconds);
  }

  getAlerts(): Observable<any> {
    return this.AlertSubject.asObservable();
  }

  private sendAlert(text: string, cssClass: string, timeoutInSeconds = this.defaultTimeoutInSeconds) {
    const alert: any = {
      id: this.id,
      text: text,
      class: cssClass,
      timeoutInSeconds: timeoutInSeconds
    };
    this.AlertSubject.next(alert);
    this.id++;
  }
}
