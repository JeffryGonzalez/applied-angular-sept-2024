import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GolfComponent } from './pages/golf/golf.component';
import { GolfService } from './pages/golf/golf.service';
import { GolfStore } from '../shared/golf.store';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, GolfComponent],
  template: `
    <p>Learning Stuff Goes Here</p>
    <ul>
      <li><a class="link" routerLink="golf">Golf Score Thing</a></li>
    </ul>
    <div>
      <p>Your Current Golf Score is: {{ golfService.totalScore() }}</p>
    </div>
    <section>
      <div class="flex">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class LearningComponent {
  golfService = inject(GolfStore);
}
