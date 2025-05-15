/* 
Usecases: Infinite - Depend on my mood

Any usecase - Master Skills
* Big list > small list  s.t. criteria (filtering)
* Proportional Circles. Radius s.t. property
* InfoWindow Design 
* Route between two points 

*/




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

interface CircularObjects{
  position: google.maps.LatLngLiteral;
  radius: number;
  color: string; 
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
  
  currentlocation: google.maps.LatLngLiteral;
  clicklocation:   google.maps.LatLngLiteral;
  mapcenter:       google.maps.LatLngLiteral;
  zoom: number;
  informedMakerlist: InformedMarker[]; 
  circleList: CircularObjects[];

  constructor(){
    this.currentlocation = {lat: 0, lng: 0};
    this.mapcenter = {lat: 0, lng: 0};
    this.clicklocation = {lat: 0, lng: 0};
    this.zoom = 4;
    this.informedMakerlist = [];
    this.circleList = [];
  }
  ngOnInit() {
      this.centerMapToLocation();
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
  removeCircles(){
    this.circleList = [];
  }

  clearMap(){
    this.removeCircles();
    this.removeMarkers();
  }

  removeMarker(informedMarker:InformedMarker){
    const indexToRemove = this.informedMakerlist.indexOf(informedMarker);
    if(indexToRemove!=-1)
      this.informedMakerlist.splice(indexToRemove,1);
  }

  circleClicked(circle:any){
    console.log(circle);
    circle.radius = circle.radius*2; 
  }

  async centerMapToLocation(){
    const loc = await this.getCurrentLocation().catch((error)=>console.log);
    if(!loc)
      return; 
    this.adjustMap(loc,4);
  }
  
  changeColor(){
    const mapCircle = this.circles.get(0);
    if (mapCircle?.circle) {
      mapCircle.circle.setOptions({
        fillColor: '#FF0000'  // new color
      });
    } else 
      console.warn('Circle is not yet initialized.');
    
  }
  closeAllWindow(){
    this.infoWindows.forEach((informedWindow)=>{informedWindow.close()});
  }


  usecase1(){
    // TODO: Write code that will show a 3k circle
    // around only the first marker 
    for(let i = 0; i < this.informedMakerlist.length; i++)
      this.circleList.push({position: this.informedMakerlist[i].position, radius:30000,color:"black"});
  }

  adjustMap(location:any, zoom: number){
    this.mapcenter = location;
    this.zoom = zoom;
  }

}
