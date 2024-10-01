import { computed, Injectable, signal } from '@angular/core';
export type GolfHole = {
  holeNumber: number;
  score: number;
};

@Injectable({
  providedIn: 'root',
})
export class GolfService {
  #currentHole = signal(1);
  #currentScore = signal(0);

  #holes = signal<GolfHole[]>([]);
  increment() {
    this.#currentScore.update((s) => s + 1);
  }
  decrement() {
    this.#currentScore.update((s) => s - 1);
  }
  constructor() {}
  totalScore = computed(() => {
    const finalScore = this.#holes() // this holes signal is still referring to the same value.
      .map((s) => s.score) // score
      .reduce((a, b) => a + b, 0);
    return finalScore;
  });
  sunk() {
    const record: GolfHole = {
      holeNumber: this.#currentHole(),
      score: this.#currentScore(),
    };

    this.#holes.set([record, ...this.#holes()]); // reassigning this to a new list
    this.#currentHole.update((h) => (h += 1));
    this.#currentScore.set(0);
  }

  currentScore = computed(() => this.#currentScore);

  public currentHole() {
    return this.#currentHole.asReadonly();
  }
  public holes() {
    return this.#holes.asReadonly;
  }
}
