import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  it('isLoading should be false initially', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service.isLoading).toEqual(false);
  });
  it('isNewData should be false initially', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service.isNewData).toEqual(false);
  });
  it('resetResult should be false initially', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service.resetResult).toEqual(true);
  });
});
