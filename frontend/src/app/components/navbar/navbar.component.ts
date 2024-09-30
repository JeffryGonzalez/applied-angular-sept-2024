import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarCenterMenuComponents } from "./components/navbar-center-menu.components";
import { NavbarEndComponent } from "./components/navbar-end.component";
import { NavbarItemsComponent } from "./components/navbar-side-menu.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarEndComponent, NavbarItemsComponent, NavbarCenterMenuComponents],
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
         
<app-nav-bar-side-menu-items />
        
        </div>
        <a class="btn btn-ghost text-xl">Applied Angular</a>
      </div>
      <div class="navbar-center hidden lg:flex">
      
         <app-nav-bar-center-items />
        
      </div>
      <div class="navbar-end">
        <app-nav-bar-end />
      </div>
    </div>
  `,
  styles: ``,
})
export class NavbarComponent {}
