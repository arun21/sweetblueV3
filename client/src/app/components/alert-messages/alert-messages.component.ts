import { Component, OnInit, OnDestroy } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { AlertService } from '@core/services/alert.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.less']
})
export class AlertMessagesComponent implements OnInit, OnDestroy {
  public alertMessages: any[] = [];
  private destroyed$ = new Subject<void>();

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.getAlerts()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(alert => {
        this.alertMessages.push(alert);
        this.scheduleAlertTimeout(alert);
      });
  }

  removeAlertByIndex(index: number) {
    this.alertMessages.splice(index, 1);
  }

  scheduleAlertTimeout(alert: any) {
    async.schedule(() => {
      const index = this.alertMessages.findIndex(el => el.id === alert.id);
      if (index !== -1) {
        this.removeAlertByIndex(index);
      }
    }, (alert.timeoutInSeconds * 1000));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
