import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerHomeComponent } from './listener-home.component';

describe('ListenerHomeComponent', () => {
  let component: ListenerHomeComponent;
  let fixture: ComponentFixture<ListenerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListenerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
