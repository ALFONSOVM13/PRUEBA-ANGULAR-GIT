import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <article
      class="bg-whiten/70 rounded-xl shadow-md border border-gray-200 flex flex-col"
      [ngClass]="[
        hover ? 'hover:shadow-lg transition-all duration-300' : '',
        className
      ]">
      <ng-content select="[header]"></ng-content>
      <div class="p-6 flex-1">
        <ng-content></ng-content>
      </div>
      <ng-content select="[footer]"></ng-content>
    </article>
  `
})
export class CardComponent {
  @Input() hover = false;
  @Input() className = '';
}
