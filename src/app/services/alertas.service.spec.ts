import { TestBed } from '@angular/core/testing';

import { AlertasService } from './alertas.service';

describe('AlertasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertasService = TestBed.get(AlertasService);
    expect(service).toBeTruthy();
  });
});
