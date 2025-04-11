import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Electronics } from './electronics.component';

describe('ElectronicsComponent', () => {
  let component: Electronics;
  let fixture: ComponentFixture<Electronics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Electronics ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Electronics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
