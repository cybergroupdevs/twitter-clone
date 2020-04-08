import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetweetComponent } from './retweet.component';

describe('RetweetComponent', () => {
  let component: RetweetComponent;
  let fixture: ComponentFixture<RetweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
