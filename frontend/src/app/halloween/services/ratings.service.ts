import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import {
  HouseListEntity,
  HouseRatingEntry,
  RatingRange,
} from '../pages/house-rating/types';
import { concatMap, map, Observable, tap } from 'rxjs';
import z from 'zod';

const HouseSchema = z.object({
  id: z.string(),
  address: z.string(),
  hasAmbiance: z.boolean(),
  hasFullsizeCandy: z.boolean(),
  qualityRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  quantityRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
});

const HouseResponseSchema = z.array(HouseSchema);

type WeirdResponse = {
  id: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  ratings: {
    ambiance: number;
    candy: number;
  };
  qualityRating: number;
  quantityRating: number;
};
// watch this space.
@Injectable()
export class RatingsService {
  #http = inject(HttpClient);

  addHouseToList(house: HouseRatingEntry) {
    return this.#http.post<HouseListEntity>('/api/houses', house);
  }

  getHouseList() {
    return this.#http
      .get<WeirdResponse[]>('/api/houses')
      .pipe(map((r) => r.map(mapToEntity)));
  }
}

function mapToEntity(r: WeirdResponse): HouseListEntity {
  return {
    id: r.id,
    address: r.address.street,
    hasAmbiance: !!r.ratings.ambiance,
    hasFullSizeCandy: !!r.ratings.candy,
    qualityRating: r.quantityRating as RatingRange,
    quantityRating: r.quantityRating as RatingRange,
  };
}
