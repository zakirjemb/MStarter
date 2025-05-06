import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [MContainerComponent,GoogleMap],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {

  lat: number;
  lng: number; 
  center: google.maps.LatLngLiteral =  {lat: 0, lng: 0};
  zoom: number = 4;

  constructor(){
    this.lat = 0; 
    this.lng = 0; 
    navigator.geolocation.getCurrentPosition((data)=>{
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      this.center = {lat:this.lat , lng: this.lng};
    });

  }
  showWhereTheUserClicked(event: google.maps.MapMouseEvent){
      console.log(event.latLng?.toJSON());
  }
}
