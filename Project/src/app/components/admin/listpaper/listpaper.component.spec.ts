import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpaperComponent } from './listpaper.component';

describe('ListpaperComponent', () => {
  let component: ListpaperComponent;
  let fixture: ComponentFixture<ListpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
