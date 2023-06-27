import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartethComponent } from './charteth.component';

describe('ChartethComponent', () => {
  let component: ChartethComponent;
  let fixture: ComponentFixture<ChartethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartethComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
