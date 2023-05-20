import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagebootstrapComponent } from './messagebootstrap.component';

describe('MessagebootstrapComponent', () => {
  let component: MessagebootstrapComponent;
  let fixture: ComponentFixture<MessagebootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagebootstrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagebootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
