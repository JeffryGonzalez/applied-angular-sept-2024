import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HouseListStore } from '../../stores/house-list.store';
import { JsonPipe } from '@angular/common';
import { HouseListItemComponent } from './components/house-list-item';

@Component({
  selector: 'app-house-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, HouseListItemComponent],
  template: `
    <div>
      @if(store.isPending() === false) { }

      <ul class="flex flex-row flex-wrap gap-4">
        @for(item of store.getHouseListModel(); track item.id) {
        <app-house-list-item [item]="item" />
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class HouseListComponent {
  store = inject(HouseListStore);
}
