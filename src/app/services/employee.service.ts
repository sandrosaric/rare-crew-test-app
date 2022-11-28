import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Employee } from '../model/employee-response.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //private _apiURL = "https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==";
  private _localJSONURL = 'assets/data.json';

  constructor(private http: HttpClient) { 
  }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this._localJSONURL)
    .pipe(
      tap(data => {
        console.log(data);
      }),
      catchError(this.handleError<Employee[]>('getAllEmployees', []))
    );
  }


  private handleError<T>(failedCall:string, result?: T) {
    
    return (error: any): Observable<T> => {

      console.log(`${failedCall} failed: ${error.message}`);
  
      return of(result as T);
    };
}
}
