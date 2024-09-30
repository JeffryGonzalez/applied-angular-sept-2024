import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-bar-side-menu-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      <li><a>Learning</a></li>

      <li><a>Item 3</a></li>
    </ul>
  `,
  styles: ``,
})
export class NavbarItemsComponent {}
