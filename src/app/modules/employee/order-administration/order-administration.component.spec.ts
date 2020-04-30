import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdministrationComponent } from './order-administration.component';

describe('OrderAdministrationComponent', () => {
  let component: OrderAdministrationComponent;
  let fixture: ComponentFixture<OrderAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
