import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { CardComponent } from '../../../../core/components/card/card.component';
import { Post } from '../../../../core/models/post.interface';
import { PostService } from '../../../../core/services/post.service';
import { PostHeaderComponent } from '../post-header/post-header.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    ButtonComponent,
    FontAwesomeModule,
    PostHeaderComponent
  ],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post> = of();
  faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/posts']);
      return;
    }
    this.post$ = this.postService.getPost(Number(id));
  }

  ngOnInit(): void {}

  onBack(): void {
    this.router.navigate(['/posts']);
  }
}
