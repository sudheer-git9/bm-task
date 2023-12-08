import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse

} from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput } from 'rxjs';
// import 'rxjs/add/operator/pipe';
import { throwError, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { catchError, } from 'rxjs/operators';
import { take, finalize } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { EnvService } from '../env.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private envService: EnvService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any> | any> {
    return next.handle(this.addTokenToRequest(request, this.envService.currentEnvironment.token))
      .pipe(
        catchError(err => {
          return throwError(err);
        }));
  }


  public addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token && request.url.indexOf('mocki.io') === -1) {

      let res = request.clone({ setHeaders: { Authorization: `Bearer ${token}`, 'Accept': '*/*' } });
      return res;
    } else {
      return request;
    }
  }

}
