import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { INotification } from '../interfaces/Notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiURL = 'http://localhost:3000/api/notifications';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(`${this.apiURL}/all`, { headers: this.headers }).pipe(
      catchError(err => throwError(() => err)));
  }

}
