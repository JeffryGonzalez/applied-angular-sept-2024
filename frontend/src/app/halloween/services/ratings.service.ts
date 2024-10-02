import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { HouseRatingEntry } from '../pages/house-rating/types';
import { HouseListEntity } from '../stores/house-list.store';

// watch this space.
@Injectable()
export class RatingsService {
  #http = inject(HttpClient);

  addHouseToList(house: HouseRatingEntry) {
    return this.#http.post<HouseListEntity>('/api/houses', house);
  }
}
