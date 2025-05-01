import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MCompassComponent } from '../../m-framework/components/m-compass/m-compass.component';
import { MResultBoxComponent } from "../../m-framework/components/m-result-box/m-result-box.component";
import { MDeviceService } from '../../m-framework/services/m-device.service';
@Component({
  selector: 'app-qiblafinder',
  standalone: true,
  imports: [MContainerComponent, FormsModule, CommonModule, HttpClientModule, MCompassComponent, MResultBoxComponent],
  templateUrl: './qiblafinder.component.html',
  styleUrl: './qiblafinder.component.css',
})
export class QiblafinderComponent {
  lat: number | null = null;
  lng: number | null = null;
  city: string;
  angle: number | null = null;
  googleApiKey: string = 'AIzaSyBKlRRlfmxLvZl96bN-kh5gXBhISBM7_bY';
  orientation: DeviceOrientationEvent | null = null;
  motion: DeviceMotionEvent | null = null;

  readonly MakkaLatitude: number = 21.4225;
  readonly MakkaLongitude: number = 39.8262;

  direction: number;

  constructor(public httpClient: HttpClient,public mDevice: MDeviceService) {
    this.city = '';
    this.direction = 0;
    this.mDevice.orientation$.subscribe(o => this.orientation = o);
    this.mDevice.motion$.subscribe(m => this.motion = m);
  }
  findQibla() {
    const url: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.city)}&key=${this.googleApiKey}`;
    this.httpClient.get(url).subscribe((data: any) => {
      this.lat = data.results[0].geometry.location.lat;
      this.lng = data.results[0].geometry.location.lng;
      this.getQiblaDirection(this.lat, this.lng);
    });
  } 

  getQiblaDirection(lat:number | null, lng:number | null) {
    if (!lat || !lng) return;
    const dLon = ((this.MakkaLongitude - lng) * Math.PI) / 180;
    lat *= Math.PI / 180;
    const qibla =
      (Math.atan2(
        Math.sin(dLon),
        Math.cos(lat) * Math.tan((this.MakkaLatitude * Math.PI) / 180) -
          Math.sin(lat) * Math.cos(dLon)
      ) *
        180) /
      Math.PI;
    this.angle = (qibla + 360) % 360;
  }

  enableSensors() {
    this.mDevice.requestPermissions();
  }
}
