import { TestBed } from '@angular/core/testing';

import { GetHeroesService } from './get-heroes.service';

describe('GetHeroesService', () => {
  let service: GetHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
