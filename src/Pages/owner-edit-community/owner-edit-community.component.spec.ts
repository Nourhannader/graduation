import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerEditCommunityComponent } from './owner-edit-community.component';

describe('OwnerEditCommunityComponent', () => {
  let component: OwnerEditCommunityComponent;
  let fixture: ComponentFixture<OwnerEditCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerEditCommunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerEditCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
