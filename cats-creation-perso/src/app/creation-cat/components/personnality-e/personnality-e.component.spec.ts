import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalityEComponent } from './personnality-e.component';

describe('PersonnalityEComponent', () => {
  let component: PersonnalityEComponent;
  let fixture: ComponentFixture<PersonnalityEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnalityEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalityEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
