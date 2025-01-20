import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckEditComponent } from './truck-edit.component';

describe('TruckEditComponent', () => {
  let component: TruckEditComponent;
  let fixture: ComponentFixture<TruckEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
