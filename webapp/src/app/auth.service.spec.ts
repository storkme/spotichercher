import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { parseISO } from 'date-fns';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {

    console.log('parseISO', parseISO(undefined));
    expect(service).toBeTruthy();
  });
});
