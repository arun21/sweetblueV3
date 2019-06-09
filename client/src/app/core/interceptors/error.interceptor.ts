import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

export interface CustomHttpError {
    status?: number;
    message: string;
};

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError(
                    err => {
                        let customErr: CustomHttpError = { message: '' };

                        if (err.error instanceof ErrorEvent) {
                            // A client-side or network error occurred. Handle it accordingly.
                            customErr.message = err.error.message;
                        }
                        else {
                            // The backend returned an unsuccessful response code.
                            if (err.error && err.error.message && typeof err.error.message === 'string') {
                                customErr.status = err.status;
                                customErr.message = err.error.message;
                            }
                            else {
                                // Internal server error, don't show this to user
                                customErr.message = 'Unexpected error occured, please try again. If this error persists, please contact support.';
                            }
                        }
                        
                        throw customErr;
                    }
                )
            );
    }
}