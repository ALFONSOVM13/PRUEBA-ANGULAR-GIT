import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      [ngClass]="[variantClasses[variant], className]">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() className = '';

  readonly variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
}
