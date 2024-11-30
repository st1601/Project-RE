import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiclabraryComponent } from './musiclabrary.component';

describe('MusiclabraryComponent', () => {
  let component: MusiclabraryComponent;
  let fixture: ComponentFixture<MusiclabraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusiclabraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusiclabraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
