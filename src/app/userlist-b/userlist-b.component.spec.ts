import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistBComponent } from './userlist-b.component';

describe('UserlistBComponent', () => {
  let component: UserlistBComponent;
  let fixture: ComponentFixture<UserlistBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserlistBComponent]
    });
    fixture = TestBed.createComponent(UserlistBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
