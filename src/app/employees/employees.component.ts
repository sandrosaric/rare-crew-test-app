import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Employee } from '../model/employee-response.model';

import { EmployeeService } from '../services/employee.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  employeesResponse:Employee[] = [];

  employeesForPresentation: any[] = [];

  chartLabels:string[] = [];

  chartSeries:number[] = [];

 
  constructor(private employeeService: EmployeeService,private sharedDataService: SharedDataService){
  }
  ngOnInit(){
    this.getAllEmployees();
  }



  private getAllEmployees(){
    
    this.employeeService.getAllEmployees().subscribe(
      result => {
        this.employeesResponse = result;
        
       this.employeesForPresentation = this.employeesResponse.map((item) => {
          return {
            name:item.EmployeeName,
            hours:this.calculateWorkingHours(item)
          }
        }).sort((a,b) => b.hours - a.hours).splice(0,4);

        this.prepareDataForSharing();
    },
      error => {
      }
    )
  }

  private prepareDataForSharing() {
    this.employeesForPresentation.forEach(e => this.chartLabels.push(e.name));
    this.employeesForPresentation.forEach(e => this.chartSeries.push(e.hours));
    this.sharedDataService.setSharedData(this.chartLabels);
    this.sharedDataService.setSharedData2(this.chartSeries);
  }

  private calculateWorkingHours(item: Employee) {
    var start = new Date(item.StarTimeUtc + "Z");
    var end = new Date(item.EndTimeUtc + "Z");
    const difference = Math.abs(start.getTime() - end.getTime());
    var hourDifference = Math.floor(difference / 1000 / 3600);
    return hourDifference;
  }
}
