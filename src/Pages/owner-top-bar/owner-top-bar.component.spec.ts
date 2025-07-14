import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTopBarComponent } from './owner-top-bar.component';

describe('OwnerTopBarComponent', () => {
  let component: OwnerTopBarComponent;
  let fixture: ComponentFixture<OwnerTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerTopBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
