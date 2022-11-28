import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  chartSeries:ApexNonAxisChartSeries = [];


  chartLabels:string[] = [];



  chartTitle: ApexTitleSubtitle = {
    text:"Top Working Hours Employees",
    align:"left"
  }

  chartDetails :ApexChart = {
    type:'pie',
    toolbar:{
      show:true
    }
  }

  chartDataLabels:ApexDataLabels = {
    enabled:true
  }

  constructor(private sharedDataService:SharedDataService){}

  ngOnInit(){
   this.sharedDataService.getSharedData().subscribe(data => this.chartLabels = data);
   this.sharedDataService.sharedData2.subscribe(data => this.chartSeries = data);
  }
  

}
