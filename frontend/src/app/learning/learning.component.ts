import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-learning',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <p>Learning Stuff Goes Here</p>
    `,
    styles: ``
})
export class LearningComponent {

}