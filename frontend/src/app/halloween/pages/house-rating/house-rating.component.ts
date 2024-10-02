import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HouseRatingStore } from './house-rating.store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-house-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [HouseRatingStore],
  template: `
    <p>House Rating Here</p>
    <form [formGroup]="form">
      <div class="form-control">
        <label for="Address" class="label">
          <span>Address</span>
          <input
            type="text"
            class="input input-bordered"
            formControlName="address"
          />
        </label>
      </div>
      <div>
        <p>Quality Rating</p>
        <div class="rating rating-lg">
          @for(rating of [0,1,2,3,4]; track rating) {
          <input
            type="radio"
            (change)="store.set('qualityRating', rating)"
            [checked]="store.qualityRating() === rating"
            name="quality"
            class="mask mask-star-2 bg-orange-400"
          />
          }
        </div>
      </div>
      <p>Quantity Rating</p>
      <div class="rating rating-lg">
        @for(rating of [0,1,2,3,4]; track rating) {
        <input
          type="radio"
          (change)="store.set('quantityRating', rating)"
          [checked]="store.quantityRating() === rating"
          name="quantity"
          class="mask mask-star-2 bg-orange-400"
        />
        }
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Had Good Ambiance</span>
          <input
            type="checkbox"
            [checked]="store.hasAmbiance()"
            (change)="store.toggle('hasAmbiance')"
            class="checkbox
          checkbox-error"
          />
        </label>
      </div>
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text">Gave Full Size Candybars</span>
          <input
            type="checkbox"
            [checked]="store.hasFullSizeCandy()"
            (change)="store.toggle('hasFullSizeCandy')"
            class="checkbox checkbox-error"
          />
        </label>
      </div>
    </form>
    <pre>
    current quality: {{ store.qualityRating() }}
</pre>
  `,
  styles: ``,
})
export class HouseRatingComponent {
  store = inject(HouseRatingStore);

  constructor() {
    this.form.controls.address.valueChanges
      .pipe(
        debounceTime(300),
        filter(() => this.form.controls.address.valid),
        takeUntilDestroyed()
      )
      .subscribe((value) => {
        this.store.set('address', value);
      });
  }
  form = new FormGroup({
    address: new FormControl('', { nonNullable: true }),
  });
}
