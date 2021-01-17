import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknowErrorComponent } from './unknow-error.component';

describe('UnknowErrorComponent', () => {
  let component: UnknowErrorComponent;
  let fixture: ComponentFixture<UnknowErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknowErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknowErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
