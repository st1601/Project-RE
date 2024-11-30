import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListartistComponent } from './listartist.component';

describe('ListartistComponent', () => {
  let component: ListartistComponent;
  let fixture: ComponentFixture<ListartistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListartistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListartistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
