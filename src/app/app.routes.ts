import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { HardwareComponent } from './hardware/hardware.component';
import { SideeffectsComponent } from './sideeffects/sideeffects.component';
export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'hardware', component:HardwareComponent},
    {path:'sideeffects', component:SideeffectsComponent},
    
];
