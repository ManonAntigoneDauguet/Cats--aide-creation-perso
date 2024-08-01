import { Component } from '@angular/core';
import { PresentationComponent } from '../components/presentation/presentation.component';
import { PersonnalityEComponent } from '../components/personnality-e/personnality-e.component';

@Component({
  selector: 'app-creation-cat',
  standalone: true,
  imports: [
    PresentationComponent,
    PersonnalityEComponent
  ],
  templateUrl: './creation-cat.component.html',
  styleUrl: './creation-cat.component.scss'
})
export class CreationCatComponent {

}
