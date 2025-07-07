import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button
      (click)="buttonClick.emit()"
      [disabled]="disabled"
      [class]="
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 cursor-pointer ' +
        sizeClasses +
        ' ' +
        variantClasses
      "
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<void>();

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'h-8 px-3 text-xs';
      case 'lg':
        return 'h-12 px-8 text-base';
      default:
        return 'h-10 px-4 text-sm';
    }
  }

  get variantClasses(): string {
    switch (this.variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary/80 focus-visible:ring-primary';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary/80 focus-visible:ring-gray-500';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500';
      case 'warning':
        return 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500';
      case 'info':
        return 'bg-cyan-600 text-white hover:bg-cyan-700 focus-visible:ring-cyan-500';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-600 focus-visible:ring-gray-500';
      default:
        return '';
    }
  }
}
