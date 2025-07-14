import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditUnitComponent } from './owner-edit-unit.component';

describe('OwnerEditUnitComponent', () => {
  let component: OwnerEditUnitComponent;
  let fixture: ComponentFixture<OwnerEditUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerEditUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerEditUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
