import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Breed } from '../models/breed';
import { Faction } from '../models/faction';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data';
  private breedsSubject: BehaviorSubject<Breed[]> = new BehaviorSubject<Breed[]>([]);
  private factionsSubject: BehaviorSubject<Faction[]> = new BehaviorSubject<Faction[]>([]);
  private personnalityESubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadBreedData();
    this.loadFactionData();
    this.loadPersonnalityE();
  }

  private loadBreedData(): void {
    this.http.get<Breed[]>(`${this.dataUrl}/breeds.json`).subscribe(
      data => this.breedsSubject.next(data)
    );
  }

  private loadFactionData(): void {
    this.http.get<Faction[]>(`${this.dataUrl}/factions.json`).subscribe(
      data => this.factionsSubject.next(data)
    );
  }

  private loadPersonnalityE(): void {
    this.http.get<any[]>(`${this.dataUrl}/personnalityE.json`).subscribe(
      data => this.personnalityESubject.next(data)
    );
  }

  getBreeds(): Observable<Breed[]> {
    return this.breedsSubject.asObservable();
  }

  getFactions(): Observable<Faction[]> {
    return this.factionsSubject.asObservable();
  }

  getPersonnalityE(): Observable<any[]> {
    return this.personnalityESubject.asObservable();
  }

  getBreedByName(breedName: string): Observable<Breed> {
    const selectedBreed = this.getBreeds().pipe(map(
      breeds => breeds.find(breed => breed.name == breedName)!
    ))
    if (!selectedBreed) {
      return this.getBreeds().pipe(map(
        breeds => breeds.find(breed => breed.name == "autre...")!
      ))
    }
    return selectedBreed;
  }
}
