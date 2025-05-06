import { Component, ViewChild } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap,MapMarker,MapInfoWindow,MapCircle } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [MapCircle,CommonModule,MContainerComponent,GoogleMap,MapMarker,MapInfoWindow],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  mylocation: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral =  {lat: 0, lng: 0};
  zoom: number = 4;
  positions: google.maps.LatLngLiteral[] = [];

  constructor(){
    this.mylocation = {lat: 0, lng: 0};
    navigator.geolocation.getCurrentPosition((data)=>{
      this.mylocation.lat = data.coords.latitude;
      this.mylocation.lng = data.coords.longitude;
      this.center = this.mylocation;
    });

  }

  addMarker(event: google.maps.MapMouseEvent){
      let locationPicked = event.latLng?.toJSON()
      if(locationPicked)
        this.positions.push(locationPicked);
      
  }

  openInfoWindow(marker: MapMarker){
    this.infoWindow.open(marker);
  }
}
