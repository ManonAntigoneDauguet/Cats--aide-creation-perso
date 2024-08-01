import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breed } from '../models/breed';
import { Faction } from '../models/faction';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.dataUrl}/breeds.json`);
  }

  getFactions(): Observable<Faction[]> {
    return this.http.get<Faction[]>(`${this.dataUrl}/factions.json`);
  }
}
