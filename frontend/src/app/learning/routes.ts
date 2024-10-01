import { Routes } from '@angular/router';
import { LearningComponent } from './learning.component';
import { GolfComponent } from './pages/golf/golf.component';
import { GolfService } from './pages/golf/golf.service';
import { GolfStore } from '../shared/golf.store';

export const LEARNING_ROUTES: Routes = [
  {
    path: 'learning',
    // providers: [GolfStore],
    component: LearningComponent,
    children: [
      {
        path: 'golf',
        component: GolfComponent,
      },
    ],
  },
];
