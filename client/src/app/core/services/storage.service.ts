import { Injectable, Inject } from '@angular/core';
import { windowToken } from '@core/factories/window.provider';
import { Logger } from '@core/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  private storageMode = 'localStorage';

  constructor(
      private logger: Logger,
      @Inject(windowToken) private window
    ) {
      const w = window; 
      if(!w.localStorage || !w.localStorage.getItem || !w.localStorage.setItem || !w.localStorage.removeItem) {
        this.storageMode = 'cookie';
      }
  }

  setItem(key:string, value: any): boolean {
    if (!key || !value) return false; // If  key or value null or undefined

    try {
      let item = typeof value === 'object' ? JSON.stringify(value) : value;
      if(this.storageMode === 'localStorage') {
        this.window.localStorage.setItem(key, item);
        return true;
      } 
      else {
        this.window.document.cookie = `${key}=${JSON.stringify(value)}`;
        return true;
      }
    }
    catch(e) {
      this.logger.consoleLog(e);
      return false;
    }
    
  }

  getItem(key: string){
    let item: any;

    if(this.storageMode === 'localStorage') {
      item = this.window.localStorage.getItem(key);
    } 
    else {
      item = this.getCookieByName(key);
    }

    try {
      return JSON.parse(item);
    }
    catch(e) {
      this.logger.consoleLog(e);
      return item; // If parsing failed, its not Json string
    }
    
  }

  removeItem(key: string): boolean{
    try {
      if(this.storageMode === 'localStorage') {
        this.window.localStorage.removeItem(key);
        return true;
      } 
      else {
        this.window.document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        return true;
      }
    } 
    catch (e) {
      this.logger.consoleLog(e);
      return false;
    }
    
  }

  private getCookieByName(name: string) {
    let cookies = window.document.cookie;
    let filteredCookie = cookies.split(';').filter(cookie => cookie.includes(name));
    let requestedCookieKeyValue = filteredCookie.length > 0 ? filteredCookie[0] : ':';
    return requestedCookieKeyValue.split(':')[1];
  }

}
