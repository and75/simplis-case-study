import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Payload } from '../../models/payload';
import { Subscription } from '../../models/subscribe';

import { AuthService } from '../auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  get AuthToken() {
    return this.authService.authToken;
  }

  /** GET All Books */
  getActivities(): Observable<any> {
    const url = `${this.ApiServiceUrl}activities`;
    return this.http.get<Payload>(url, { headers: this.Header }).pipe(
      tap(_ => this.log(`fetched getActivities (all)`)),
      catchError(this.handleError('getActivities (all)', []))
    );
  }

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

  saveSubscription(data:Subscription): Observable<any>{
    const url = `${this.ApiServiceUrl}activities`;
    return this.http.get<Payload>(url, { headers: this.Header }).pipe(
      tap(_ => this.log(`fetched getActivities (all)`)),
      catchError(this.handleError('getActivities (all)', []))
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
