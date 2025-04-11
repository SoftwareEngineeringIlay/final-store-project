import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sailing } from './sailing.component';

describe('SailingComponent', () => {
  let component: Sailing;
  let fixture: ComponentFixture<Sailing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sailing ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sailing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
