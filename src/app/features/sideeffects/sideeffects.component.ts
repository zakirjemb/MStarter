import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { getDatabase, ref, set, push, remove, onValue, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sideeffects',
  standalone: true,
  imports: [MContainerComponent,CommonModule,FormsModule,CanvasJSAngularChartsModule,HttpClientModule],
  templateUrl: './sideeffects.component.html',
  styleUrl: './sideeffects.component.css'
})
export class SideeffectsComponent {
  medicine: string;
  chart: any; 
  chartOptions: any; 
  db: any;
  epc: string;
  sideeffects: any[];

  getChartInstance(chart: object) {
    this.chart = chart;
  }
  constructor(public httpClient: HttpClient){
    this.medicine = "";
    this.db = getDatabase(initializeApp(environment));
    this.epc = "";
    this.sideeffects = [];
    this.chartOptions = {
      theme: "light2",
      animationEnabled: true,
      title: { text: " Side Effects vs Frequency"},
      axisX: {labelAngle: -90}
    }

  }
  findSideEffects(){
      console.log("/"+this.medicine);
      get(ref(this.db,"/"+this.medicine))
        .then( (data)  => {
          this.epc = data.val();
          this.httpClient.get("https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:" + this.epc + "&count=patient.reaction.reactionmeddrapt.exact")
              .subscribe((data:any)=> {
                for(let i = 0 ; i < 10; i++)
                  this.sideeffects.push({label:data.results[i].term, y:data.results[i].count });
                this.chartOptions.data = [{type:"column",  dataPoints: this.sideeffects}];
                this.chart.render();

              });
          


        })
        .catch((error) => console.log(error));
    
  }
  

}
