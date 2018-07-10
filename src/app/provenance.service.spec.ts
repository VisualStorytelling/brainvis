import { TestBed, inject } from '@angular/core/testing';

import { ProvenanceService } from './provenance.service';

describe('ProvenanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvenanceService]
    });
  });

  it('should be created', inject([ProvenanceService], (service: ProvenanceService) => {
    expect(service).toBeTruthy();
  }));
});
