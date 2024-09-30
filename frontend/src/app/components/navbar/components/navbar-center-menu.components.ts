import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-bar-center-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <ul class="menu menu-horizontal px-1">
      <li><a>Learning</a></li>

      <li><a>Halloween Tracker</a></li>
    </ul>
  `,
  styles: ``,
})
export class NavbarCenterMenuComponents {}
