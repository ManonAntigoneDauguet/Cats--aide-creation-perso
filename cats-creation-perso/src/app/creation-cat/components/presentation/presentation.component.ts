import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { map, Observable } from 'rxjs';
import { Breed } from '../../../core/models/breed';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Faction } from '../../../core/models/faction';

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

  constructor(private dataService: DataService) { }

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
}
