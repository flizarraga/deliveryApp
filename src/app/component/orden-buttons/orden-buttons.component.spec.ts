import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenButtonsComponent } from './orden-buttons.component';

describe('OrdenButtonsComponent', () => {
  let component: OrdenButtonsComponent;
  let fixture: ComponentFixture<OrdenButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
