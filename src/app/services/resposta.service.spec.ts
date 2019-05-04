import { TestBed } from '@angular/core/testing';

import { RespostaService } from './resposta.service';

describe('RespostaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespostaService = TestBed.get(RespostaService);
    expect(service).toBeTruthy();
  });
});
