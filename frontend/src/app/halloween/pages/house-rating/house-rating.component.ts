import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-house-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>House Rating Here</p>
    <form>
      <div>
        <p>Quality Rating</p>
        <div class="rating rating-lg">
          <input
            type="radio"
            name="quality"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="quality"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="quality"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="quality"
            class="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="quality"
            class="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>
      <p>Quantity Rating</p>
      <div class="rating rating-lg">
        <input
          type="radio"
          name="quantity"
          class="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="quantity"
          class="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="quantity"
          class="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="quantity"
          class="mask mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="quantity"
          class="mask mask-star-2 bg-orange-400"
        />
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Had Good Ambiance</span>
          <input
            type="checkbox"
            checked="checked"
            class="checkbox checkbox-error"
          />
        </label>
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Gave Full Size Candybars</span>
          <input
            type="checkbox"
            checked="checked"
            class="checkbox checkbox-error"
          />
        </label>
      </div>
    </form>
  `,
  styles: ``,
})
export class HouseRatingComponent {}
