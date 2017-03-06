import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelularComponent } from './celular.component';

describe('CelularComponent', () => {
  let component: CelularComponent;
  let fixture: ComponentFixture<CelularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
