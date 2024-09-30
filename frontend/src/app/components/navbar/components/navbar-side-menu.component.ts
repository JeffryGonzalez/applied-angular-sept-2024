import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LinkItem } from '../types';

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
    @for(link of links(); track $index) {
      <li><a>{{link.text}}</a></li>
    }
    
    </ul>
  `,
  styles: ``,
})
export class NavbarItemsComponent {

  links = input.required<LinkItem[]>();
}
