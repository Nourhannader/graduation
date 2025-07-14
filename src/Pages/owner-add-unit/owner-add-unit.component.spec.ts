import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddUnitComponent } from './owner-add-unit.component';

describe('OwnerAddUnitComponent', () => {
  let component: OwnerAddUnitComponent;
  let fixture: ComponentFixture<OwnerAddUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAddUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerAddUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
