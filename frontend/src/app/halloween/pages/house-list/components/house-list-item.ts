import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { HouseRatingListItem } from '../../house-rating/types';

@Component({
  selector: 'app-house-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <li class="card bg-base-100 w-96  shadow-xl">
      <div class="card-body">
        <p class="card-title">
          @if(item().isPending) {
          <span class="loading loading-bars loading-md"></span> }
          {{ item().address }}
        </p>
        <p>Total Score: {{ item().totalScore }}</p>
        @if(item().hasFullSizeCandy) {
        <div class="badge badge-success gap-2">Has Full Sized Candybars!</div>
        } @else {
        <div class="badge badge-error gap-2">No Full Sized Candybars!</div>
        } @if(item().hasAmbiance) {
        <div class="badge badge-success gap-2">Has Great Ambiance!</div>
        } @else {
        <div class="badge badge-error gap-2">No Great Ambiance!</div>
        }
      </div>
    </li>
  `,
  styles: ``,
})
export class HouseListItemComponent {
  item = input.required<HouseRatingListItem>();
}
