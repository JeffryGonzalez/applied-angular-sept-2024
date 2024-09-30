import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-nav-bar-end',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
          <a class="btn">Button</a>
    `,
    styles: ``
})
export class NavbarEndComponent {

}