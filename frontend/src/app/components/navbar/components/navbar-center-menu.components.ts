import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { LinkItem } from '../types';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-nav-bar-center-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <ul class="menu menu-horizontal px-1">

    @for(link of links(); track $index) {
      <li><a>{{link.text}}</a></li>
    }
    
    </ul>
  `,
  styles: ``,
})
export class NavbarCenterMenuComponents {

  links = input.required<LinkItem[]>();
}
