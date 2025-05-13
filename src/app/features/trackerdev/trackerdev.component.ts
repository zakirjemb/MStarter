import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-trackerdev',
  standalone: true,
  imports: [MContainerComponent,GoogleMap],
  templateUrl: './trackerdev.component.html',
  styleUrl: './trackerdev.component.css'
})
export class TrackerdevComponent {

  currentlocation: google.maps.LatLngLiteral;
  clicklocation:   google.maps.LatLngLiteral;
  mapcenter:       google.maps.LatLngLiteral;
  zoom: number; 

  constructor(){
    this.currentlocation = {lat: 0, lng: 0};
    this.mapcenter = {lat: 0, lng: 0};
    this.clicklocation = {lat: 0, lng: 0};
    this.zoom = 4;

    navigator.geolocation.getCurrentPosition((data)=>{
      this.currentlocation.lat = data.coords.latitude;
      this.currentlocation.lng = data.coords.longitude;
    })
  }
  showMe(event:any){
    this.clicklocation.lat = event.latLng.lat();
    this.clicklocation.lng = event.latLng.lng();
  }

}
