import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCardComponent } from './dogCard.component';

describe('DogCardComponent', () => {
  let component: DogCardComponent;
  let fixture: ComponentFixture<DogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
