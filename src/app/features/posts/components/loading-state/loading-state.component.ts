import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-12">
      <div class="flex space-x-2 mb-4">
        <div class="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div class="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
        <div class="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
      </div>
      <p class="text-gray-600 text-sm">Cargando publicaciones...</p>
    </div>
  `
})
export class LoadingStateComponent {}
