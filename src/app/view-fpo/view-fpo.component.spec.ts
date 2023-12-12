import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFpoComponent } from './view-fpo.component';

describe('ViewFpoComponent', () => {
  let component: ViewFpoComponent;
  let fixture: ComponentFixture<ViewFpoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFpoComponent]
    });
    fixture = TestBed.createComponent(ViewFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
