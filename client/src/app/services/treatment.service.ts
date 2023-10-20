import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { ITreatment } from '../interfaces/Treatment.interface';
import { ITreamentResponse } from '../interfaces/TreatmentResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private apiURL = 'http://localhost:3000/api/treatment';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  createTreatment(treatment: ITreatment): Observable<ITreamentResponse> {
    return this.http.post<ITreamentResponse>(`${this.apiURL}/create`, treatment, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
    );
  }

  updateTreatment(treatment: ITreatment): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/${treatment._id}`, treatment, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
    );
  }

  deleteTreatment(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error))),
    );
  }

  getTreatments(): Observable<ITreatment[]> {
    return this.http.get<ITreatment[]>(`${this.apiURL}`, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

  //TODO: add generic types for responses on the methods below
  deleteMedicationFromTreatment(treatmentId: number, medicationId: number): Observable<ITreamentResponse> {
    return this.http.delete<ITreamentResponse>(`${this.apiURL}/${treatmentId}/medications/${medicationId}`, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

  setMedicationSchedule(treatmentId: number, medicationId: number, schedule: string): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/${treatmentId}/medications/${medicationId}`, schedule, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

  setStrictnessLevel(treatmentId: number, strictnessLevel: string): Observable<ITreamentResponse> {
    return this.http.put<ITreamentResponse>(`${this.apiURL}/${treatmentId}/strictness`, strictnessLevel, { headers: this.headers }).pipe(
      catchError(err => throwError(() => new Error(err.error.error)))
    );
  }

}