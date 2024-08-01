import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-personnality-e',
  standalone: true,
  imports: [],
  templateUrl: './personnality-e.component.html',
  styleUrl: './personnality-e.component.scss'
})
export class PersonnalityEComponent implements OnInit {
  type!: string;
  breed!: string;

  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.getType().subscribe((newType) => {
      this.type = newType;
    })
    // this.stateService.getBreed().subscribe((newBreed) => {
    //   this.breed = newBreed;
    // })
  }


}
