import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MContainerComponent } from '../../m-framework/components/m-container/m-container.component';
@Component({
  selector: 'app-feature2',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent],
  templateUrl: './feature2.component.html',
  styleUrl: './feature2.component.css'
})
export class Feature2Component {

}
