import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-bar-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <li><a>Learning</a></li>
    
    <li><a>Item 3</a></li>
  `,
  styles: ``,
})
export class NavbarItemsComponent {}
