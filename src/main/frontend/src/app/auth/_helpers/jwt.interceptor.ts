import { User } from './../../users/user.model';
import { AuthenticationService } from './../_services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var currentUser: User = this.authenticationService.currentUserValue;
        //console.log('interceptor current user: '+ currentUser);
        var currentUser: User = this.authenticationService.currentUserValueHack();
        //console.log('interceptor current user hack: '+ currentUser);
        //console.log(currentUser);
        if (currentUser && currentUser.token) {
            //request.headers.append("Authorization", `Bearer ${currentUser.token}`)
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        //console.log(request.headers)
        return next.handle(request);
    }
}
