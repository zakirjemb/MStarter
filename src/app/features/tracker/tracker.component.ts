import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [MContainerComponent],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {

  lat: number;
  lng: number; 

  constructor(){
    this.lat = 0; 
    this.lng = 0; 
    navigator.geolocation.getCurrentPosition((data)=>{
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
    });

  }
}
