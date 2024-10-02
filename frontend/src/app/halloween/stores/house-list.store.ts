import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/request-status.feature';
import { mergeMap, pipe, tap } from 'rxjs';
import {
  HouseListEntity,
  HouseRatingEntry,
  HouseRatingListItem,
} from '../pages/house-rating/types';
import { RatingsService } from '../services/ratings.service';
import { getTotalScore } from '../pages/house-rating/utils';

export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withRequestStatus(),
  withEntities<HouseListEntity>(),
  withComputed((store) => {
    return {
      getHouseListModel: computed(() => {
        return store
          .entities()
          .map(
            (e) =>
              ({ ...e, totalScore: getTotalScore(e) } as HouseRatingListItem)
          );
      }),
    };
  }),
  withMethods((store) => {
    const service = inject(RatingsService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap(() =>
            service.getHouseList().pipe(
              tapResponse({
                next: (d) => patchState(store, setEntities(d), setFulfilled()),
                error: () => setError('Error Getting List'),
              })
            )
          )
        )
      ),
      add: rxMethod<HouseRatingEntry>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap((h) =>
            service.addHouseToList(h).pipe(
              tapResponse({
                next: (h) =>
                  updateState(
                    store,
                    'adding from api',
                    addEntity(h),
                    setFulfilled()
                  ),
                error: (e: HttpErrorResponse) =>
                  patchState(
                    store,
                    setError(`Error - couldn't add house ${e.error}`)
                  ),
              })
            )
          )
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);
