import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { map, Observable } from 'rxjs';
import { Breed } from '../../../core/models/breed';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Faction } from '../../../core/models/faction';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent implements OnInit {
  breeds$!: Observable<Breed[]>;
  factions$! : Observable<Faction[]>;
  type: string = 'cat';
  breed!:  string;

  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit(): void {
    this.getBreeds();
    this.getFactions();
  }

  private getBreeds() {
    this.breeds$ = this.dataService.getBreeds();
  }

  private getFactions() {
    this.factions$ = this.dataService.getFactions();
  }

  changeType(event : Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.stateService.setType(selectElement.value);
  }

  changeBreed(event : Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.stateService.setBreed(selectElement.value);
  }
}
