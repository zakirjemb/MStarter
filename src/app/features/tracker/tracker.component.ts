
import { Component, ViewChildren ,QueryList} from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { GoogleMap,MapMarker,MapInfoWindow,MapCircle,MapDirectionsRenderer, MapDirectionsService } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [MapDirectionsRenderer,MapCircle,CommonModule,MContainerComponent,GoogleMap,MapMarker,MapInfoWindow],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent {
  @ViewChildren(MapInfoWindow) infoWindows!: QueryList<MapInfoWindow>;
  mylocation: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral =  {lat: 0, lng: 0};
  zoom: number = 4;
  positions: google.maps.LatLngLiteral[] = [];
  selected: google.maps.LatLngLiteral;
  list: any[];
  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(mapDirectionsService: MapDirectionsService){
    this.list = [];
    this.mylocation = {lat: 0, lng: 0};
    this.selected = {lat: 0, lng: 0};

    navigator.geolocation.getCurrentPosition((data)=>{
      this.mylocation.lat = data.coords.latitude;
      this.mylocation.lng = data.coords.longitude;
      this.center = this.mylocation;
    });
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 21.5, lng: 40},
      origin: {lat: 21, lng: 40.1},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));

  }

  addMarker(event: google.maps.MapMouseEvent) {
    const locationPicked = event.latLng?.toJSON();
    if (locationPicked) {
      this.positions.push(locationPicked);
      this.encapsulatingCircle();
    }
  }


  openInfoWindow(index: number, marker: MapMarker) {
    const infoWindow = this.infoWindows.toArray()[index];
    if (infoWindow) {
      infoWindow.open(marker);
    }
  }
  removeMarkers(){
    this.positions = [];
  }
  encapsulatingCircle()
  {
    let averageLat = 0;
    let averageLng = 0; 
    if (this.positions.length < 2) return;
    this.positions.forEach(element => {
      averageLat+=element.lat;
      averageLng+=element.lng;
    });
    averageLat/=this.positions.length;
    averageLng/=this.positions.length;
    
    let maxdistance = 0;
    this.positions.forEach(element => { 
      let distance = Math.sqrt((element.lat-averageLat)*(element.lat-averageLat) + (element.lng-averageLng)*(element.lng-averageLng));
      if(distance > maxdistance)
        maxdistance = distance; 
    });
    let circle = {position: {lat: averageLat, lng: averageLng }, radius: maxdistance*111100};
    this.list = [];
    this.list.push(circle);

  }
  /*
  get northpositions(): google.maps.LatLngLiteral[] {
    return this.positions.filter((item)=>{return item.lat > 0});
  }
    */
  closeAllWindows() {
    this.infoWindows.forEach(window => window.close());
  }
}