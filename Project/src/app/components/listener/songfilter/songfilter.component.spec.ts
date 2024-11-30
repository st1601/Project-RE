import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongfilterComponent } from './songfilter.component';

describe('SongfilterComponent', () => {
  let component: SongfilterComponent;
  let fixture: ComponentFixture<SongfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongfilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
