import { TestBed, inject } from '@angular/core/testing';

import { TypeProblemeService } from './type-probleme.service';

describe('TypeProblemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeProblemeService]
    });
  });

  it('should be created', inject([TypeProblemeService], (service: TypeProblemeService) => {
    expect(service).toBeTruthy();
  }));
});
