import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { HouseRatingEntry } from '../pages/house-rating/types';
import { addEntity, withEntities } from '@ngrx/signals/entities';

type HouseListEntity = HouseRatingEntry & { id: string };

export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withEntities<HouseListEntity>(),
  withMethods((store) => {
    return {
      add(house: HouseRatingEntry) {
        // fake for right now...
        const houseToAdd: HouseListEntity = {
          id: crypto.randomUUID(),
          ...house,
        };
        updateState(store, 'adding a house', addEntity(houseToAdd));
      },
    };
  })
);
