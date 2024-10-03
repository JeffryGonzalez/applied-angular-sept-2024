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
import { map, mergeMap, pipe, tap } from 'rxjs';
import {
  HouseListEntity,
  HouseRatingEntry,
  HouseRatingListItem,
} from '../pages/house-rating/types';
import { RatingsService } from '../services/ratings.service';
import { getTotalScore } from '../pages/house-rating/utils';
import { HousePendingStore } from './house-pending.store';

export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withRequestStatus(),
  withEntities<HouseListEntity>(),
  withComputed((store) => {
    const pendingStore = inject(HousePendingStore);
    return {
      getHouseListModel: computed(() => {
        const combined = [
          ...store.entities(),
          ...pendingStore.getHouseListModel(),
        ];
        return combined.map(
          (e) => ({ ...e, totalScore: getTotalScore(e) } as HouseRatingListItem)
        );
      }),
    };
  }),
  withMethods((store) => {
    const service = inject(RatingsService);
    const pendingStore = inject(HousePendingStore);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap(() =>
            service.getHouseList().pipe(
              tapResponse({
                next: (d) => patchState(store, setEntities(d), setFulfilled()),
                error: (e) =>
                  patchState(
                    store,
                    setError('Error Getting List - Server Returned Bad Data')
                  ),
              })
            )
          )
        )
      ),
      add: rxMethod<HouseRatingEntry>(
        pipe(
          map((h) => {
            const tempId = crypto.randomUUID();
            return [h, tempId] as [HouseRatingEntry, string];
          }),
          tap(() => patchState(store, setPending())),
          tap(([h, id]) => {
            pendingStore.addHouse({ ...h, id });
          }),
          mergeMap(([h, id]) =>
            service.addHouseToList(h, id).pipe(
              tapResponse({
                next: ([h, tempId]) => {
                  updateState(
                    store,
                    'adding from api',
                    addEntity(h),
                    setFulfilled()
                  );
                  pendingStore.removeHouse(tempId);
                },
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
