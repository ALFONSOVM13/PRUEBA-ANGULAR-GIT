import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CardComponent } from '../../../../core/components/card/card.component';
import { Post } from '../../../../core/models/post.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-grid',
  standalone: true,
  imports: [
    RouterModule,
    CardComponent,
    ButtonComponent,
    FontAwesomeModule
  ],
  template: `
    <div class="space-y-6">
      @for (post of posts.slice(0, 10); track post.id) {
        <app-card [hover]="true" class="group block">
          <div class="p-4">
            <div class="mb-3">
              <h2 class="text-xl font-semibold text-primary group-hover:text-primary transition-colors duration-200">
                {{ post.title }}
              </h2>
              <div class="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                <span class="text-tertiary font-bold bg-gray-100 px-2 py-1 rounded-2xl">ID: {{ post.id }}</span>
                <span class="text-tertiary font-bold bg-gray-100 px-2 py-1 rounded-2xl">User: {{ post.userId }}</span>
              </div>
            </div>

            <p class="text-gray-600 text-sm mb-4">
              {{ post.body }}
            </p>

            <div class="flex space-x-2">
              <app-button
                [routerLink]="['/posts', post.id]"
                variant="primary"
                size="sm">
                <fa-icon [icon]="faEye" class="w-4 h-4 mr-2"></fa-icon>
                View
              </app-button>
              <app-button
                [routerLink]="['/posts/edit', post.id]"
                variant="secondary"
                size="sm"
               >
                <fa-icon [icon]="faPencil" class="w-4 h-4 mr-2"></fa-icon>
                Edit
              </app-button>
              <app-button
                (buttonClick)="onDeletePost(post.id)"
                variant="danger"
                size="sm">
                <fa-icon [icon]="faTrash" class="w-4 h-4 mr-2"></fa-icon>
                Delete
              </app-button>
            </div>
          </div>
        </app-card>
      }
    </div>
  `
})
export class PostGridComponent {
  @Input() posts: Post[] = [];
  @Output() deletePost = new EventEmitter<number>();

  faEye = faEye;
  faPencil = faPencil;
  faTrash = faTrash;

  onDeletePost(id: number): void {
    this.deletePost.emit(id);
  }
}
