import { Component } from '@angular/core';
import { MContainerComponent } from "../../m-framework/components/m-container/m-container.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-qiblafinder',
  standalone: true,
  imports: [MContainerComponent,FormsModule,CommonModule],
  templateUrl: './qiblafinder.component.html',
  styleUrl: './qiblafinder.component.css'
})
export class QiblafinderComponent {
  city: string | null = null;
  angle: number | null = null;
  constructor(){
  }
  findQibla(){

  }
}
