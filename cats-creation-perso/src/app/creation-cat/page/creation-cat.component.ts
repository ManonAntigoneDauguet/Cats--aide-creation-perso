import { Component } from '@angular/core';
import { PresentationComponent } from '../components/presentation/presentation.component';

@Component({
  selector: 'app-creation-cat',
  standalone: true,
  imports: [
    PresentationComponent
  ],
  templateUrl: './creation-cat.component.html',
  styleUrl: './creation-cat.component.scss'
})
export class CreationCatComponent {

}
