import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";

@Component({
  selector: 'app-trackerdev',
  standalone: true,
  imports: [MContainerComponent],
  templateUrl: './trackerdev.component.html',
  styleUrl: './trackerdev.component.css'
})
export class TrackerdevComponent {

  currentlocation = {lat: 0, lng: 0};
  constructor(){
    navigator.geolocation.getCurrentPosition((data)=>{
      this.currentlocation.lat = data.coords.latitude;
      this.currentlocation.lng = data.coords.longitude;
    })
  }

}
