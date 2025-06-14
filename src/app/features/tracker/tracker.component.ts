import { Component, ViewChildren ,QueryList, OnInit} from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap,MapMarker,MapInfoWindow,MapCircle,MapDirectionsRenderer, MapDirectionsService } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
interface InformedMarker{
  position: google.maps.LatLngLiteral;
  title: string;
  subtitle: string;
  info: string;
};

interface CirclesToDraw{
  position: google.maps.LatLngLiteral;
  radius: number;
};

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [MapDirectionsRenderer,MapCircle,CommonModule,MContainerComponent,GoogleMap,MapMarker,MapInfoWindow, FormsModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements OnInit {
  //--------------------------------------------------------------------------------
  // Properties
  //--------------------------------------------------------------------------------
  @ViewChildren(MapMarker)        markers!:     QueryList<MapMarker>;
  @ViewChildren(MapInfoWindow)    infoWindows!: QueryList<MapInfoWindow>;
  @ViewChildren(MapCircle)        circles!:     QueryList<MapCircle>;


  currentlocation:    google.maps.LatLngLiteral;
  mapcenter:          google.maps.LatLngLiteral; 
  zoom:               number;
  informedMarkersList:InformedMarker[];
  circlesList:        CirclesToDraw[];
  directionsResults$: Observable<google.maps.DirectionsResult|undefined>;
  title: string = "";
  subtitle: string = "";
  info: string = ""; 
  movementInterval: any = null;


  //--------------------------------------------------------------------------------
  constructor(public mapDirectionsService: MapDirectionsService,public cdr: ChangeDetectorRef){
    this.currentlocation = {lat: 0, lng: 0};
    this.mapcenter = {lat: 0, lng: 0};
    this.zoom = 4; 
    this.informedMarkersList = [];
    this.circlesList = [];
    this.directionsResults$ = new Observable<google.maps.DirectionsResult|undefined>();
    
  }
  //--------------------------------------------------------------------------------
  ngOnInit(): void {
    this.centerToMyLocation();
  }

  //--------------------------------------------------------------------------------
  acquireRemotePositionalData(useCase: number){
    
    setTimeout(() => {
      const data = [
        { position:{lat: this.currentlocation.lat + 1, lng: this.currentlocation.lng + 1}, title: "Hamada Care", subtitle:"Hospital", info:"Good One" } as InformedMarker,
        { position:{lat: this.currentlocation.lat - 1, lng: this.currentlocation.lng + 1}, title: "Cleveland Care", subtitle:"Hospital", info:"Good Two" } as InformedMarker, 
        { position:{lat: this.currentlocation.lat + 1, lng: this.currentlocation.lng - 1}, title: "Burjeel Care", subtitle:"Hospital", info:"Good Three" } as InformedMarker, 
        { position:{lat: this.currentlocation.lat - 0.5, lng: this.currentlocation.lng - 0.5}, title: "NMC Care", subtitle:"Clinic", info:"Good Four" } as InformedMarker 
      ];
      if(useCase == 1) this.processRemotePositionalData1(data)
      else if (useCase == 2) this.processRemotePositionalData2(data);
      else if (useCase == 3) this.processRemotePositionalData3(data);
      else if (useCase == 4) this.processRemotePositionalData4(data);
    }, 2000);
  }

  //--------------------------------------------------------------------------------
  processRemotePositionalData1(data: any){
    // Process the acquired data
    data.forEach((dataItem: InformedMarker) => {
      this.informedMarkersList.push({position: dataItem.position, title: dataItem.title, subtitle: dataItem.subtitle, info: dataItem.info} as InformedMarker);
    });
    this.adjustMap(data[0].position.lat, data[0].position.lng, 4);
    this.circlesList = [];
    this.circlesList.push({position: data[0].position, radius: 10000} as CirclesToDraw);
    this.circlesList.push({position: data[1].position, radius: 10000} as CirclesToDraw);
  }

  //--------------------------------------------------------------------------------
  processRemotePositionalData2(data: any){
    data.forEach((dataItem: InformedMarker) => {
      this.informedMarkersList.push({position: dataItem.position, title: dataItem.title, subtitle: dataItem.subtitle, info: dataItem.info} as InformedMarker);
    });
    let averageLat = 0;
    let averageLng = 0; 
    if (this.informedMarkersList.length < 2) return;
    this.informedMarkersList.forEach(element => {
      averageLat+=element.position.lat;
      averageLng+=element.position.lng;
    });
    averageLat/=this.informedMarkersList.length;
    averageLng/=this.informedMarkersList.length;
    
    let maxdistance = 0;
    this.informedMarkersList.forEach(element => { 
      let distance = Math.sqrt((element.position.lat-averageLat)**2 + (element.position.lng-averageLng)**2);
      if(distance > maxdistance)
        maxdistance = distance; 
    });
    let circle = {position: {lat: averageLat, lng: averageLng }, radius: maxdistance*111100};
    this.circlesList = [];
    this.circlesList.push(circle);
  }

 //--------------------------------------------------------------------------------
  processRemotePositionalData3(data: any){
    const origin = data[0].position; 
    const destination = data[data.length-1].position;
    this.circlesList.push({position: data[0].position, radius: 10000} as CirclesToDraw);
    const mode = google.maps.TravelMode.BICYCLING;
    this.directionsResults$ = this.requestDirections(origin, destination, mode);
    this.directionsResults$.subscribe((result) => {
      console.log(result);
    });
  }
   //--------------------------------------------------------------------------------
   processRemotePositionalData4(data: any){
    data.forEach((dataItem: InformedMarker) => {
      this.informedMarkersList.push({position: dataItem.position, title: dataItem.title, subtitle: dataItem.subtitle, info: dataItem.info} as InformedMarker);
    });
    setInterval(() => {
      this.informedMarkersList[0] = {position: {lat: this.informedMarkersList[0].position.lat + 1, lng: this.informedMarkersList[0].position.lng + 1}, title: this.informedMarkersList[0].title, subtitle: this.informedMarkersList[0].subtitle, info: this.informedMarkersList[0].info} as InformedMarker;
    }, 1000);
  }


  //--------------------------------------------------------------------------------
  requestDirections(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral, mode: google.maps.TravelMode)
  : Observable<google.maps.DirectionsResult|undefined>
  {
    const request: google.maps.DirectionsRequest = {
      destination: destination,
      origin: origin,
      travelMode: mode
    };
    return this.mapDirectionsService.route(request).pipe(map(response => response.result));
  }

  
  getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((data) => {
          this.currentlocation = {lat: data.coords.latitude, lng: data.coords.longitude};
          resolve(this.currentlocation);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  

  //--------------------------------------------------------------------------------
  adjustMap(lat: number, lng: number, zoom: number) {
    this.zoom = zoom;
    this.mapcenter = {lat: lat, lng: lng};
  }

  //--------------------------------------------------------------------------------
  addMarker(event: google.maps.MapMouseEvent) {
    const locationPicked = event.latLng?.toJSON();
    if (locationPicked)
      this.informedMarkersList.push({position:locationPicked, title:"", subtitle:"", info:""} as InformedMarker);
  }

  //--------------------------------------------------------------------------------
  saveMarker(informedMarker: InformedMarker){
    informedMarker.title = this.title;
    informedMarker.subtitle = this.subtitle;
    informedMarker.info = this.info;
    this.title = "";
    this.subtitle = "";
    this.info = "";
    //TODO: Must update in the database 
  }

  //--------------------------------------------------------------------------------
  removeMarkers(){
    this.informedMarkersList = [];
    
  }

  //--------------------------------------------------------------------------------
  removeMarker(informedMarker: InformedMarker){
    const index = this.informedMarkersList.indexOf(informedMarker);
    if (index > -1) {
      this.informedMarkersList.splice(index, 1);
    }
    //TODO: Update the database
  }

  //--------------------------------------------------------------------------------
  removeCircles(){
    this.circlesList = [];
  }

  //--------------------------------------------------------------------------------
  clearMap(){
    this.removeCircles();
    this.removeMarkers();
    this.directionsResults$ = new Observable<google.maps.DirectionsResult|undefined>();
    //TODO: Must remove from the database
  }
  //--------------------------------------------------------------------------------
  circleClicked(circle: CirclesToDraw){ 
    circle.radius *= 2; 
    console.log(circle.radius);
    console.log("Circle clicked: " + this.circlesList[0].toString());
  }
  //--------------------------------------------------------------------------------
  openInfoWindow(index: number, marker: MapMarker) {
    const infoWindow = this.infoWindows.toArray()[index];
    if (infoWindow) 
      infoWindow.open(marker);
  }

  //--------------------------------------------------------------------------------
  closeAllWindows() {
    this.infoWindows.forEach(window => window.close());
  }

  //--------------------------------------------------------------------------------
  async centerToMyLocation(){ // UseCase
    const location = await this.getCurrentLocation().catch(error => console.error(error));
    if (!location) return;
    this.adjustMap(location.lat, location.lng, 4);
  }


  
  // 1. Top-rated restaurants (3+ stars) with circle highlight
showTopRestaurants() {

  const top = this.informedMarkersList.filter((r: InformedMarker) => 
    r.subtitle.includes('Restaurant') && +r.info >= 3
  );

  if (top.length > 0) {
    this.circlesList = [{
      position: top[0].position, 
      radius: 3000,
      color: 'green'
    } as CirclesToDraw];
  }
  /*
  this.circlesList = top.map((r: InformedMarker)=> ({
  position: r.position,
  radius: 3000,
  color: 'green'
} as CirclesToDraw));

  */
}
// 2. Hospitals with population circles
showHospitalCircles() {
   this.circlesList = [];
  this.informedMarkersList.filter((h: InformedMarker) => h.subtitle.includes('Hospital'))
    .forEach((h: InformedMarker) => {
      this.circlesList.push({
        position: h.position,
        radius: +h.info * 100
      } as CirclesToDraw);
    });
}

// 3. Nearest hospital with driving directions (short version)
async showNearestHospital() {
  const user = await this.getCurrentLocation();
  const nearest = this.informedMarkersList
    .filter(h => h.subtitle.match(/Hospital|Clinic/i))
    .sort((a,b) => this.getDistance(user, a.position) - this.getDistance(user, b.position))[0];
  
  this.directionsResults$ = this.requestDirections(user, nearest.position, google.maps.TravelMode.DRIVING);
}

// Short distance calculation
private getDistance(a: google.maps.LatLngLiteral, b: google.maps.LatLngLiteral) {
  return google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(a.lat, a.lng),
    new google.maps.LatLng(b.lat, b.lng)
  ); 
}

// 4. Moving marker with circle
startMovement() {
  if (this.movementInterval) return;
  this.movementInterval =setInterval(() => {
    if (this.informedMarkersList.length > 0 && this.circlesList.length > 0) {
      const newPos = {
        lat: this.informedMarkersList[0].position.lat + 0.01,
        lng: this.informedMarkersList[0].position.lng
      };
      
      this.informedMarkersList[0].position = newPos;
      this.circlesList[0].position = newPos;
    }
  }, 1000);
}
stopMovement() {
  if (this.movementInterval) {
    clearInterval(this.movementInterval);
    this.movementInterval = null;
  }
}
}
  //--------------------------------------------------------------------------------
  
/*
 //--------------------------------------------------------------------------------
  changeCircleColor(color: string) {
    this.circlesList.forEach(circle => {
      circle.color = color;
    });
  }
    //
startMovement() {
  if (this.movementInterval) return; // Prevent duplicate intervals

  this.movementInterval = setInterval(() => {
    for (let i = 0; i < this.informedMarkersList.length; i++) {
      const marker = this.informedMarkersList[i];

      // Move slightly north (lat + 0.01)
      const newPos = {
        lat: marker.position.lat + 0.01,
        lng: marker.position.lng
      };

      // Update marker position
      this.informedMarkersList[i].position = newPos;

      // Update circle if it exists at same index
      if (i < this.circlesList.length) {
        this.circlesList[i].position = newPos;
      }
    }
  }, 1000);
}*/

