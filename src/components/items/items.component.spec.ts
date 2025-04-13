import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Items } from './items.component';

describe('ItemsComponent', () => {
  let component: Items;
  let fixture: ComponentFixture<Items>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Items ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Items);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
