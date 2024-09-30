import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <p>Learning Stuff Goes Here</p>
    <ul>
      <li><a class="link" routerLink="golf">Golf Score Thing</a></li>
    </ul>
    <section>
      <router-outlet />
    </section>
  `,
  styles: ``,
})
export class LearningComponent {}
