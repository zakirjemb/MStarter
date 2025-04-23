import { Component } from '@angular/core';
import { MContainerComponent } from "../m-framework/components/m-container/m-container.component";
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get} from 'firebase/database';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-feature1',
  standalone: true,
  imports: [MContainerComponent,CommonModule, FormsModule, HttpClientModule,CanvasJSAngularChartsModule],
  templateUrl: './feature1.component.html',
  styleUrl: './feature1.component.css'
})
export class Feature1Component {
  db: any; 
  medicine: string;
  chart: any;
  chartOptions: any;

  getChartInstance(chart: object) {
    this.chart = chart;
  }

  
  constructor(public http: HttpClient) {
    const firebaseApp = initializeApp(environment);
    this.db = getDatabase(firebaseApp);
    this.medicine = ""; 
    this.chartOptions = {
      theme: "light2", 
      animationEnabled: true, 
      title: { text: "Side Effects vs. Frequney" }, 
      axisX: {labelAngle: -90}};

  }
  getEPC(){
    get(ref(this.db,'/'+this.medicine)).then((snapshot:any) => {
      if (snapshot.exists()) {
        console.log('https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"'+snapshot.val()+'"&count=patient.reaction.reactionmeddrapt.exact');
        this.http.get('https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:"'+snapshot.val()+'"&count=patient.reaction.reactionmeddrapt.exact').subscribe((data: any)=>{
          console.log(data.results);
          this.chartOptions.data = [{
            type: "column",
            dataPoints: data.results.slice(0,10).map((result: any) => ({
              label: result.term,
              y: result.count
            }))
          }];
          this.chart?.render();
        });


      } else {
        console.log("No data available");
      }
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
