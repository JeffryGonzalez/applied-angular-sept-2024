import { Routes } from '@angular/router';
import { HalloweenComponent } from './halloween.component';
import { HouseListStore } from './stores/house-list.store';

export const HALLOWEEN_ROUTES: Routes = [
  {
    path: '',
    providers: [HouseListStore],
    component: HalloweenComponent,
  },
];
