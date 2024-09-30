import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
type GolfHole = {
  holeNumber: number;
  score: number;
};
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <div>
        <button class="btn btn-primary" (click)="decrement()">-</button>
        <span>{{ currentScore() }}</span>
        <button class="btn btn-primary" (click)="increment()">+</button>
        <button class="btn btn-primary" (click)="sunk()">Sunk</button>
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

  sunk() {
    const record: GolfHole = {
      holeNumber: this.currentHole(),
      score: this.currentScore(),
    };
    this.holes.update((h) => {
      h.push(record);
      return h;
    });
    this.currentHole.update((h) => (h += 1));
    this.currentScore.set(0);
  }
}
