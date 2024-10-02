import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HouseRatingEntry, RatingRange } from './types';
import { withDevtools, updateState } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { HouseListStore } from '../../stores/house-list.store';
const initialState: HouseRatingEntry = {
  address: '',
  qualityRating: 0,
  quantityRating: 0,
  hasAmbiance: false,
  hasFullSizeCandy: false,
};
export const HouseRatingStore = signalStore(
  withDevtools('house-rating-entry'),
  withState(initialState),
  withMethods((store) => {
    const houseListStore = inject(HouseListStore);
    return {
      set(
        key: keyof Omit<HouseRatingEntry, 'hasAmbiance' | 'hasFullSizeCandy'>,
        value: unknown
      ) {
        updateState(store, `changed ${key}`, { [key]: value });
      },
      toggle(
        key: keyof Pick<HouseRatingEntry, 'hasAmbiance' | 'hasFullSizeCandy'>
      ) {
        updateState(store, `toggled ${key}`, { [key]: !store[key]() });
      },
      add() {
        const houseToSend: HouseRatingEntry = {
          address: store.address(),
          hasAmbiance: store.hasAmbiance(),
          hasFullSizeCandy: store.hasFullSizeCandy(),
          qualityRating: store.qualityRating(),
          quantityRating: store.quantityRating(),
        };
        houseListStore.add(houseToSend);
        updateState(store, 'added house', initialState);
      },
    };
  }),
  withComputed((store) => {
    return {
      totalScore: computed(() => {
        const ratings =
          store.qualityRating() + 1 + (store.quantityRating() + 1);
        const bonus =
          (store.hasAmbiance() ? 1 : 0) + (store.hasFullSizeCandy() ? 1 : 0);
        return ratings + bonus;
      }),
    };
  })
);
