import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GolfStore } from '@shared/golf.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>The Dashboard Stuff Goes Here For Realz!</p>
    <div>
      <p>By The Way, Your Total Golf Score is: {{ golfStore.totalScore() }}</p>
    </div>
  `,
  styles: ``,
})
export class DashboardComponent {
  golfStore = inject(GolfStore);
}
