import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonBookingsComponent } from './person-bookings.component';

describe('PersonBookingsComponent', () => {
  let component: PersonBookingsComponent;
  let fixture: ComponentFixture<PersonBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonBookingsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
