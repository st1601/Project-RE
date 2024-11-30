import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarartistComponent } from './navbarartist.component';

describe('NavbarartistComponent', () => {
  let component: NavbarartistComponent;
  let fixture: ComponentFixture<NavbarartistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarartistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarartistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
