/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriesResolverService } from './categories-resolver.service';

describe('Service: CategoriesResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesResolverService]
    });
  });

  it('should ...', inject([CategoriesResolverService], (service: CategoriesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
