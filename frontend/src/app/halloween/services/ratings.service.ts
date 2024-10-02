import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { HouseListEntity, HouseRatingEntry } from '../pages/house-rating/types';

// watch this space.
@Injectable()
export class RatingsService {
  #http = inject(HttpClient);

  addHouseToList(house: HouseRatingEntry) {
    return this.#http.post<HouseListEntity>('/api/houses', house);
  }

  getHouseList() {
    return this.#http.get<HouseListEntity[]>('/api/houses');
  }
}
