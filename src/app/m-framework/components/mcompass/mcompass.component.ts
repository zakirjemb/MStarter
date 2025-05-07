import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'm-compass',
  standalone: true,
  templateUrl: './mcompass.component.html',
  styleUrls: ['./mcompass.component.css']
})
export class MCompassComponent implements OnInit, OnDestroy {
  heading: number = 0;
  private orientationHandler = this.handleOrientation.bind(this);

  ngOnInit(): void {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', this.orientationHandler, true);
      window.addEventListener('deviceorientation', this.orientationHandler, true);
    } else {
      console.warn('DeviceOrientationEvent not supported.');
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('deviceorientationabsolute', this.orientationHandler);
    window.removeEventListener('deviceorientation', this.orientationHandler);
  }

  private handleOrientation(event: DeviceOrientationEvent): void {
    if (event.alpha !== null) {
      this.heading = 360 - event.alpha; // rotate clockwise
    }
  }
}
