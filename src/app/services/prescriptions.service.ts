import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Prescriptions } from "../interfaces/prescriptions";
import { AuthService } from '@auth/services/auth.service';
import { Patient } from '@interfaces/patients';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPrescriptions(): Observable<any>{
    return this.http.get(`${environment.API_END_POINT}/prescriptions`);
  }

  dispense(prescription: Prescriptions): Observable<Prescriptions> {
    prescription.status = 'Dispensada'
    prescription.dispensedBy = this.authService.getLoggedUserId();
    return this.http.put<Prescriptions>(`${environment.API_END_POINT}/prescriptions/${prescription._id}`, prescription).pipe(
      tap(_ => console.log(`fetched prescription date=${prescription._id}`)),
      catchError(this.handleError<Prescriptions>(`getPrescriptionByDate date=${prescription._id}`))
    );
  }

  getByPatientAndDate(patientId: string, date: Date): Observable<Prescriptions[]> {
    return this.http.get<Prescriptions[]>(`${environment.API_END_POINT}/prescriptions/get-by-patient-and-date/${patientId}&${date}`);
  }

  getByPatientId(patientId: string): Observable<Prescriptions[]> {
    return this.http.get<Prescriptions[]>(`${environment.API_END_POINT}/prescriptions/get-by-patient-id/${patientId}`);
  }

  newPrescription(prescription: Prescriptions): Observable<Prescriptions> {
    return this.http.post<Prescriptions>(`${environment.API_END_POINT}/prescriptions`, prescription);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}