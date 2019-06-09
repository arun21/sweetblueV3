import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly urlsWithoutAuth = ['/api/auth', '/api/tags'];
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const noAuthTokenNeeded = this.urlsWithoutAuth.some(url => request.url.toLowerCase().includes(url));

        if(!noAuthTokenNeeded) {
            const token = this.authService.loadToken();
            request = request.clone({
                setHeaders: {
                    'Content-Type':  'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}