import { InjectionToken } from "@angular/core";

export const windowToken = new InjectionToken("windowProvider");

export const windowProvider = () => {
    return window;
}