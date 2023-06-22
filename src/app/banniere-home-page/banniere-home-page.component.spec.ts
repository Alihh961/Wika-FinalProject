import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanniereHomePageComponent } from './banniere-home-page.component';

describe('BanniereHomePageComponent', () => {
  let component: BanniereHomePageComponent;
  let fixture: ComponentFixture<BanniereHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanniereHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanniereHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
