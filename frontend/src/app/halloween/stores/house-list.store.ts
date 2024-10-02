import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { HouseRatingEntry } from '../pages/house-rating/types';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { RatingsService } from '../services/ratings.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export type HouseListEntity = HouseRatingEntry & { id: string };

export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withEntities<HouseListEntity>(),
  withMethods((store) => {
    const service = inject(RatingsService);
    return {
      add: rxMethod<HouseRatingEntry>(
        pipe(
          mergeMap((h) =>
            service.addHouseToList(h).pipe(
              tapResponse({
                next: (h) =>
                  updateState(store, 'adding from api', addEntity(h)),
                error: (e) => console.log(e),
              })
            )
          )
        )
      ),
    };
  })
);
