import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private sharedData$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private sharedData2$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public sharedData2 = this.sharedData2$.asObservable();

  setSharedData2(data:any){
    this.sharedData2$.next(data);
  }

  constructor() { }

  public getSharedData() : Observable<any[]> {
    return this.sharedData$.asObservable();
  }

  public setSharedData(employees:any[]){
    this.sharedData$.next(employees);
  }
}
