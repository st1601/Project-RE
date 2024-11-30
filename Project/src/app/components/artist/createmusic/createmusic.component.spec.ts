import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemusicComponent } from './createmusic.component';

describe('CreatemusicComponent', () => {
  let component: CreatemusicComponent;
  let fixture: ComponentFixture<CreatemusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemusicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
