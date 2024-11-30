import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarlistenComponent } from './navbarlisten.component';

describe('NavbarlistenComponent', () => {
  let component: NavbarlistenComponent;
  let fixture: ComponentFixture<NavbarlistenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarlistenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarlistenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
