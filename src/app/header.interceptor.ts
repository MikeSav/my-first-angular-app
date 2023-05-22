import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {
  Observable,
  of
} from 'rxjs';
import { MOCK_ALBUMS } from '../globals';

/**
 * This file is a bit of a hack due to time... please pay no attention to it!
 */

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  // get the mockdata
  MOCK_DATA = MOCK_ALBUMS;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET' && request.url.endsWith('/get-albums')) {
      // this is for everything
      return of(
        new HttpResponse({
          status: 200,
          statusText: 'OK',
          body: this.MOCK_DATA
        })
      );

    } else if (request.method === 'GET' && request.url.startsWith('/get-albums/')) {
      // for a specific album
      const requestId = request.url.split('/')[2];
      const singleRecord = this.MOCK_DATA.filter((item: any) => item.id === requestId)[0];
      return of(
        new HttpResponse({
          status: 200,
          statusText: 'OK',
          body: singleRecord
        }));
    } else {
      return next.handle(request);
    }
  }
}
