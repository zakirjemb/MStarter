import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/components/m-container/m-container.component';
@Component({
  selector: 'app-feature3',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent],
  templateUrl: './feature3.component.html',
  styleUrl: './feature3.component.css'
})
export class Feature3Component {

}
