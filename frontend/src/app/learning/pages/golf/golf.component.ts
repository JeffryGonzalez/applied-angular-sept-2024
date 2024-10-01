import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  DecrementButtonDirective,
  IncrementButtonDirective,
} from '@shared/increment-button.directive';
type GolfHole = {
  holeNumber: number;
  score: number;
};
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IncrementButtonDirective, DecrementButtonDirective],
  template: `
    <div>
      <div>
        <button appDecrementButton (click)="decrement()">-</button>
        <span>{{ currentScore() }}</span>
        <button appIncrementButton (click)="increment()">+</button>
        <button class="btn" (click)="sunk()">Sunk</button>
      </div>

      <ul>
        @for(hole of holes(); track hole.holeNumber) {
        <li>Hole {{ hole.holeNumber }}: {{ hole.score }}</li>
        } @empty {
        <p>
          You are on the first hole. Sink one and you'll see your history here
        </p>
        }
      </ul>
      @if(currentHole() === 1) {
      <p>Have a great game!</p>
      } @else {
      <p>You have a total score of {{ totalScore() }}</p>
      }
    </div>
  `,
  styles: ``,
})
export class GolfComponent {
  currentScore = signal(0);
  currentHole = signal(1);
  holes = signal<GolfHole[]>([]);
  increment() {
    this.currentScore.update((s) => s + 1);
  }
  decrement() {
    this.currentScore.update((s) => s - 1);
  }

  totalScore = computed(() => {
    const finalScore = this.holes() // this holes signal is still referring to the same value.
      .map((s) => s.score) // score
      .reduce((a, b) => a + b, 0);
    return finalScore;
  });
  sunk() {
    const record: GolfHole = {
      holeNumber: this.currentHole(),
      score: this.currentScore(),
    };

    this.holes.set([record, ...this.holes()]); // reassigning this to a new list
    this.currentHole.update((h) => (h += 1));
    this.currentScore.set(0);
  }
}
