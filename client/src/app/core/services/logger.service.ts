import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logger {
  private devMode: boolean;

  constructor() { 
    this.devMode = isDevMode();
  }

  consoleLog(...params) {
    if(this.devMode) {
      console.log.apply(console, params);
    }
  }
}
