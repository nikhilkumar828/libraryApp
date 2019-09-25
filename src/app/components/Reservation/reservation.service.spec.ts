import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [
      RouterTestingModule
      ]
  }));

  it('should be created', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    expect(service).toBeTruthy();
  });

  it('getReservedBooks called', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    service.getReservedBooks();
    expect(service).toBeTruthy();
  });
});
