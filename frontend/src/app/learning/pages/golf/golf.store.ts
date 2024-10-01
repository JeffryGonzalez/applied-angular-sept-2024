import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { GolfHole } from './golf.service';
import { computed } from '@angular/core';

type GolfGameState = {
  currentHole: number;
  currentScore: number;
  holes: GolfHole[];
};

const initialState: GolfGameState = {
  currentHole: 1,
  currentScore: 0,
  holes: [],
};
export const GolfStore = signalStore(
  withState(initialState),
  withComputed((state) => {
    return {
      totalScore: computed(() => {
        const finalScore = state
          .holes() // this holes signal is still referring to the same value.
          .map((s) => s.score) // score
          .reduce((a, b) => a + b, 0);
        return finalScore;
      }),
    };
  }),
  withMethods((store) => {
    return {
      decrement() {
        patchState(store, { currentScore: store.currentScore() - 1 });
      },
      increment() {
        patchState(store, { currentScore: store.currentScore() + 1 });
      },
      sunk() {
        const record: GolfHole = {
          holeNumber: store.currentHole(),
          score: store.currentScore(),
        };
        patchState(store, {
          currentHole: store.currentHole() + 1,
          currentScore: 0,
          holes: [...store.holes(), record],
        });
      },
    };
  })
);
