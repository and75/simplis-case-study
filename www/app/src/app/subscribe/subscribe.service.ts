import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Activity, Customer, Subscribe } from '../../models/subscribe';
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
  getActivities(): Observable<Activity[]> {
    const url = `${this.ApiServiceUrl}activities`;
    return this.http.get<Activity[]>(url, { headers: this.Header }).pipe(
      tap(_ => this.log(`fetched getActivities (all)`)),
      catchError(this.handleError('getActivities (all)', []))
    );
  }

  downloadPdf(id: string): Observable<any> {
    let ApiUrl = `${environment.apiUrl}drive/download/${id}`;
    return this.http.get<any>(ApiUrl, { headers: this.Header, responseType: 'blob' as 'json' })
      .pipe(
        tap(_ => this.log(`fetched downloadPdf `)),
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
