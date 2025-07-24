import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterHomeComponent } from './renter-home.component';

describe('RenterHomeComponent', () => {
  let component: RenterHomeComponent;
  let fixture: ComponentFixture<RenterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenterHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
