import { Routes } from '@angular/router';
import { HalloweenComponent } from './halloween.component';
import { HouseListStore } from './stores/house-list.store';
import { HouseListComponent } from './pages/house-list/house-list.component';
import { HouseRatingComponent } from './pages/house-rating/house-rating.component';
import { RatingsService } from './services/ratings.service';
import { HousePendingStore } from './stores/house-pending.store';

export const HALLOWEEN_ROUTES: Routes = [
  {
    path: '',
    providers: [HouseListStore, RatingsService, HousePendingStore],
    component: HalloweenComponent,
    children: [
      {
        path: 'house-list',
        component: HouseListComponent,
      },
      {
        path: 'house-entry',
        component: HouseRatingComponent,
      },
    ],
  },
];
