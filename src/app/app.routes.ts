import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Feature1Component } from './feature1/feature1.component';
export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'feature1', component:Feature1Component}
];
