import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MLoginComponent } from '../../m-framework/m-login/m-login.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MLoginComponent,CommonModule, FormsModule, MContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  constructor()
  {

  }

  
}