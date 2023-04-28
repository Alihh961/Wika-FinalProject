import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularcreatorsComponent } from './popularcreators.component';

describe('PopularcreatorsComponent', () => {
  let component: PopularcreatorsComponent;
  let fixture: ComponentFixture<PopularcreatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularcreatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularcreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
