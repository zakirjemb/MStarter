import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { auditTime } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MDeviceService {


  private orientationRaw = new BehaviorSubject<DeviceOrientationEvent | null>(null);
  private motionRaw      = new BehaviorSubject<DeviceMotionEvent | null>(null);

  orientation$: Observable<DeviceOrientationEvent|null>; 
  motion$: Observable<DeviceMotionEvent | null>; 
  private orientationPermissionGranted = false; 
  private motionPermissionGranted = false; 

  constructor(private zone:NgZone) {
      this.orientation$ = this.orientationRaw.asObservable().pipe(auditTime(100)); 
      this.motion$ = this.motionRaw.asObservable().pipe(auditTime(100));

   }
   async requestPermission(): Promise<void>{

      const DOR = DeviceOrientationEvent as any; 
      const DMR = DeviceMotionEvent as any; 
      try
      { 
        if(DOR && typeof DOR.requestPermission === 'function')    
          this.orientationPermissionGranted = (await DOR.requestPermission()) === 'granted';
        else
          this.orientationPermissionGranted = true;
        
        if(DMR && typeof DMR.requestPermission === 'function')    
            this.motionPermissionGranted = (await DMR.requestPermission()) === 'granted';
        else
            this.motionPermissionGranted = true; 

        this.startListeners();

      }
      catch(e)
      {
        console.log("Permission request failed: ", e);
      }
   }
  
  startListeners(): void{
    if(this.orientationPermissionGranted)
    {
      window.addEventListener('deviceorientation', (event)=>{
        this.zone.run(()=>{this.orientationRaw.next(event)});
      });
    }
    
    if(this.motionPermissionGranted){
      window.addEventListener('devicemotion', (event)=>{
        this.zone.run(()=>{this.motionRaw.next(event)});
      })
    }
     
   }
}
