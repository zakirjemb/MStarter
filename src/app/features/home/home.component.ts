import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/components/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Step 1: Import the service/provider 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  constructor(public router: Router) // Step 2: Inject the service - Depend. Injection 
  {
    
  }
  goToFeature1(){
    this.router.navigateByUrl("/feature1"); // Step 3: Use the provider/service 
  }
  goToFeature2(){
    this.router.navigateByUrl("/feature2");
  }
  goToFeature3(){
    this.router.navigateByUrl("/feature3");
  }
}