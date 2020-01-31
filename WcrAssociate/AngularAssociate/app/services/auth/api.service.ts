import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PlatformLocation } from '@angular/common';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

    apiEndPoint: string = '';
    constructor(private http: HttpClient,
        private platformLocation: PlatformLocation
    ) {
        console.log(location.origin);
        console.log((platformLocation as any).location.href);

        if (environment.apiEndPoint == location.origin+"/") {
            this.apiEndPoint = environment.apiEndPoint;
        }
        else {
            this.apiEndPoint = location.origin + "/";
        }
    }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${this.apiEndPoint}${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${this.apiEndPoint}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(
            `${this.apiEndPoint}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${this.apiEndPoint}${path}`
        ).pipe(catchError(this.formatErrors));

    }
    abc() { }
}
