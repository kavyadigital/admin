import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotdealComponent } from './hotdeal.component';

describe('HotdealComponent', () => {
  let component: HotdealComponent;
  let fixture: ComponentFixture<HotdealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotdealComponent]
    });
    fixture = TestBed.createComponent(HotdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
