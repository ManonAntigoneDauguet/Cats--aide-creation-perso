import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatBloc } from '../models/statsBloc';
import { Breed } from '../models/breed';
import { Faction } from '../models/faction';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private typeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('cat');
  private statBlocSubject: BehaviorSubject<StatBloc> = new BehaviorSubject<StatBloc>(new StatBloc(1, 1, 1, 1, 1, 1, 1, 1, 1));
  private breedSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private factionSubject: BehaviorSubject<Faction> = new BehaviorSubject<Faction>(new Faction(11, 'autre...'));
  // private qualitiesubject: BehaviorSubject<PersonnalityE[]> = new BehaviorSubject<PersonnalityE[]>([]);
  // private defaultSubject: BehaviorSubject<PersonnalityE[]> = new BehaviorSubject<PersonnalityE[]>([]);

  constructor() { }

  // TYPE
  setType(type: string): void {
    console.log('data changed : ', type)
    this.typeSubject.next(type);
  }

  getType(): Observable<string> {
    return this.typeSubject.asObservable();
  }

  // STATBLOC
  setBlocStat(statBloc: StatBloc): void {
    this.statBlocSubject.next(statBloc);
  }

  getStatBlock(): Observable<StatBloc> {
    return this.statBlocSubject.asObservable();
  }

  // BREED
  setBreed(breed: string): void {
    console.log('data changed : ', breed);
    this.breedSubject.next(breed);
  }

  getBreed(): Observable<string> {
    return this.breedSubject.asObservable();
  }

  // FACTIONS
  setFaction(faction: Faction): void {
    this.factionSubject.next(faction);
  }

  getFaction(): Observable<Faction> {
    return this.factionSubject.asObservable();
  }

  // // QUALITIES
  // setQualities(quality: PersonnalityE): void {
  //   this.qualitiesubject.next(
  //     [...this.qualitiesubject, quality]
  //   );
  // }
}
