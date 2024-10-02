import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HouseListStore } from '../../stores/house-list.store';
import { JsonPipe } from '@angular/common';
import { HouseListItem } from './components/house-list-item';

@Component({
  selector: 'app-house-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, HouseListItem],
  template: `
    <div>
      @if(store.isPending() === false) {

      <ul class="grid grid-flow-col gap-4">
        @for(item of store.getHouseListModel(); track item.id) {
        <app-house-list-item [item]="item" />
        }
      </ul>
      }
    </div>
  `,
  styles: ``,
})
export class HouseListComponent {
  store = inject(HouseListStore);
}
