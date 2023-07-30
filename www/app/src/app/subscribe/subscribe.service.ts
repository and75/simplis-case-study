import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Payload } from '../../models/payload';
import { ApiSubscribe } from '../../models/subscribe';

import { AuthService } from '../auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of,shareReplay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private ApiServiceUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders();
  }

  /**
   * 
   * Prepared Not implemented
   * get AuthToken() {
    return this.authService.authToken;
    }
   */

 
  /**
   * @description Get list of Activities
   * @returns Observable
   */
  getActivities(): Observable<any> {
    const url = `${this.ApiServiceUrl}activities`;
    return this.http.get<Payload>(url, { headers: this.Header }).pipe(
      tap(_ => this.log(`fetched getActivities (all)`)),
      catchError(this.handleError('getActivities (all)', []))
    );
  }

  /**
   * searchActivities
   * @param search:string 
   * @returns Observable Payload
   */
  searchActivities(search:string): Observable<any> {

      if (!search.trim()) {
        return of([]);
      }
 
      const url = `${this.ApiServiceUrl}activities/search?q=${search}`;
      return this.http.get<Payload>(url, { headers: this.Header }).pipe(
        tap(_ => this.log(`fetched AppSearch matching "${search}"`)),
        catchError(this.handleError<any[]>('AppSearch', []))
      );
  }

  /**
   * saveSubscription
   * @description Save the subsciptions process
   * @param data ApiSubscribe
   * @returns Observable 
   */
  saveSubscription(data:ApiSubscribe): Observable<any>{
    const url = `${this.ApiServiceUrl}subscription/save`;
    const formData: any = new FormData();
    formData.append('subscription', JSON.stringify(data));
    return this.http.post<Payload>(url, formData, { headers: this.Header }).pipe(
      tap(_ => this.log(`fetched saveSubscription`)),
      catchError(this.handleError('saveSubscription', []))
    );
  }

  downloadPDF(id:any): Observable<any> {
    let ApiUrl = `${environment.apiUrl}agreements/pdf?id=${id}`;
    return this.http.get<any>(ApiUrl, {
      headers: this.Header,
      responseType: 'blob' as 'json',
      reportProgress: true,
      observe: 'events'
    }).pipe(
        shareReplay(1),
        catchError(this.handleError<any>(`downloadPdf`))
    );
  }

  /* handleError */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /* log */
  private log(log: string) {
    console.info(log);
  }
}
