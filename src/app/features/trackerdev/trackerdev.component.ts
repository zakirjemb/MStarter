import { Component, OnInit, ViewChild, ViewChildren,QueryList } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap,MapMarker,MapInfoWindow, MapCircle } from '@angular/google-maps';
import { CommonModule } from '@angular/common';


interface InformedMarker{
  position: google.maps.LatLngLiteral;
  title: string; 
  subtitle: string; 
  info: string; 
};

@Component({
  selector: 'app-trackerdev',
  standalone: true,
  imports: [MContainerComponent,GoogleMap,MapMarker,CommonModule,MapInfoWindow,MapCircle],
  templateUrl: './trackerdev.component.html',
  styleUrl: './trackerdev.component.css'
})
export class TrackerdevComponent implements OnInit{

  @ViewChildren(MapMarker) markers!: QueryList<MapMarker>;
  @ViewChildren(MapInfoWindow) infoWindows!: QueryList<MapInfoWindow>;
  @ViewChildren(MapCircle) circles!: QueryList<MapCircle>;
  
  currentlocation: google.maps.LatLngLiteral | void;
  clicklocation:   google.maps.LatLngLiteral | undefined;
  mapcenter:       google.maps.LatLngLiteral;
  zoom: number;
  informedMakerlist: InformedMarker[]; 

  constructor(){
    this.currentlocation = {lat: 0, lng: 0};
    this.mapcenter = {lat: 0, lng: 0};
    this.clicklocation = {lat: 0, lng: 0};
    this.zoom = 4;
    this.informedMakerlist = [];
  }
  async ngOnInit() {
      this.currentlocation = await this.getCurrentLocation().catch((error)=>{console.log(error)});
  }
  
  async showMe(event:google.maps.MapMouseEvent){
    this.clicklocation = event.latLng?.toJSON();
  }
  addMarker(event: google.maps.MapMouseEvent){
    const locationClicked = event.latLng?.toJSON();
    if(locationClicked)
      this.informedMakerlist.push({position:locationClicked,title:"Title Goes Here",subtitle:"Subtitle Goes Here",info:"Info Goes Here"});
  }

  getCurrentLocation(): Promise<{lat: number, lng: number}>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition((data)=>{
        const location = {lat: data.coords.latitude, lng: data.coords.longitude};
        resolve(location);
      },(error)=>{
        reject(error);
      })
    });
  }
  openInfoMarker(i: number, marker: MapMarker){
    const infoWindow = this.infoWindows.toArray()[i];
    if(infoWindow)
      infoWindow.open(marker);
  }

  removeMarkers(){
    this.informedMakerlist = [];
  }

  removeMarker(informedMarker:InformedMarker){
    const indexToRemove = this.informedMakerlist.indexOf(informedMarker);
    if(indexToRemove!=-1)
      this.informedMakerlist.splice(indexToRemove,1);
  }

}
