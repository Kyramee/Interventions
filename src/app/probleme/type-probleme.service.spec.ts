import { TestBed, inject } from '@angular/core/testing';

import { TypeProblemeService } from './type-probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('TypeProblemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [TypeProblemeService]
    });
  });

  it('should be created', inject([TypeProblemeService], (service: TypeProblemeService) => {
    expect(service).toBeTruthy();
  }));
});
