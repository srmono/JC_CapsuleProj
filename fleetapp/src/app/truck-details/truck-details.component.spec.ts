import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckDetailsComponent } from './truck-details.component';

describe('TruckDetailsComponent', () => {
  let component: TruckDetailsComponent;
  let fixture: ComponentFixture<TruckDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
