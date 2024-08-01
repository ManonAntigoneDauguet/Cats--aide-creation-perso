import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCatComponent } from './creation-cat.component';

describe('CreationCatComponent', () => {
  let component: CreationCatComponent;
  let fixture: ComponentFixture<CreationCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
