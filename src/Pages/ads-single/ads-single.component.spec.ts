import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSingleComponent } from './ads-single.component';

describe('AdsSingleComponent', () => {
  let component: AdsSingleComponent;
  let fixture: ComponentFixture<AdsSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdsSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
