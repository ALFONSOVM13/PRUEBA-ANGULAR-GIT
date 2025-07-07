import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faList, faPlus, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { Post } from '../../../../core/models/post.interface';
import { LoadingService } from '../../../../core/services/loading.service';
import { PostService } from '../../../../core/services/post.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { LoadingStateComponent } from '../loading-state/loading-state.component';
import { PostGridComponent } from '../post-grid/post-grid.component';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { PostTableComponent } from '../post-table/post-table.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    FontAwesomeModule,
    ButtonComponent,
    PostHeaderComponent,
    LoadingStateComponent,
    EmptyStateComponent,
    PostGridComponent,
    PostTableComponent
  ],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  private readonly VIEW_MODE_KEY = 'postViewMode';
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  viewMode: 'grid' | 'table' = 'grid';
  faPlus = faPlus;
  faList = faList;
  faTableCells = faTableCells;

  constructor(
    private postService: PostService,
    private loadingService: LoadingService
  ) {
    this.posts$ = this.postService.posts$;
    this.loading$ = this.loadingService.getLoading();
  }

  ngOnInit(): void {
    const savedViewMode = localStorage.getItem(this.VIEW_MODE_KEY);
    if (savedViewMode === 'grid' || savedViewMode === 'table') {
      this.viewMode = savedViewMode;
    }
  }

  toggleView(): void {
    this.viewMode = this.viewMode === 'grid' ? 'table' : 'grid';
    localStorage.setItem(this.VIEW_MODE_KEY, this.viewMode);
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id).subscribe(() => {
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La publicación ha sido eliminada',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        });
      }
    });
  }
}
