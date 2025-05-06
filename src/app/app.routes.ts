import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HardwareComponent } from './features/hardware/hardware.component';
import { SideeffectsComponent } from './features/sideeffects/sideeffects.component';
import { QiblafinderComponent } from './features/qiblafinder/qiblafinder.component';
import { TrackerComponent } from './features/tracker/tracker.component';
export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'hardware', component:HardwareComponent},
    {path:'sideeffects', component:SideeffectsComponent},    
    {path:'qiblafinder',component:QiblafinderComponent},
    {path:'tracker',component:TrackerComponent}
 
];
