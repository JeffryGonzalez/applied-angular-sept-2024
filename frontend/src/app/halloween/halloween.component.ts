import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HouseRatingComponent } from './pages/house-rating/house-rating.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HouseRatingComponent],
  template: `
    <p>This is the Fall Holiday</p>
    <app-house-rating />
  `,
  styles: ``,
})
export class HalloweenComponent {}
