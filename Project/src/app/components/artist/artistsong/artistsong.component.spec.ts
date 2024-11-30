import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsongComponent } from './artistsong.component';

describe('ArtistsongComponent', () => {
  let component: ArtistsongComponent;
  let fixture: ComponentFixture<ArtistsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
