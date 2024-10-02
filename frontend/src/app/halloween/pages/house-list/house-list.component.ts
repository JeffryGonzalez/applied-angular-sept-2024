import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HouseListStore } from '../../stores/house-list.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-house-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <div>
      <ul>
        @for(house of store.entities(); track house.id) {
        <li>{{ house.address }}</li>
        } @empty {
        <p>You don't have any houses yet. Add Some (PUT A LINK HERE)</p>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class HouseListComponent {
  store = inject(HouseListStore);
}
