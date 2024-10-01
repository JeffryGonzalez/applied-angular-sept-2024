import { Routes } from '@angular/router';
import { LearningComponent } from './learning.component';
import { GolfComponent } from './pages/golf/golf.component';
import { GolfService } from './pages/golf/golf.service';

export const LEARNING_ROUTES: Routes = [
  {
    path: 'learning',
    providers: [GolfService],
    component: LearningComponent,
    children: [
      {
        path: 'golf',
        component: GolfComponent,
      },
    ],
  },
];
