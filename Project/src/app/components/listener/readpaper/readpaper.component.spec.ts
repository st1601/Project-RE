import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadpaperComponent } from './readpaper.component';

describe('ReadpaperComponent', () => {
  let component: ReadpaperComponent;
  let fixture: ComponentFixture<ReadpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
