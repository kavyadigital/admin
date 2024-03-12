import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsNpressComponent } from './news-npress.component';

describe('NewsNpressComponent', () => {
  let component: NewsNpressComponent;
  let fixture: ComponentFixture<NewsNpressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsNpressComponent]
    });
    fixture = TestBed.createComponent(NewsNpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
