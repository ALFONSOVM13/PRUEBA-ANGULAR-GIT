import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PostService } from '../../../../core/services/post.service';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PostHeaderComponent,
    ButtonComponent,
    FontAwesomeModule
  ],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  isEditing: boolean = false;
  postId: number | null = null;
  faArrowLeft = faArrowLeft;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      userId: ['', [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onBack(): void {
    this.router.navigate(['/posts']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.postId = Number(id);
      this.loadPost(this.postId);
    }
  }

  loadPost(id: number): void {
    this.postService.getPost(id).subscribe(post => {
      this.postForm.patchValue(post);
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = this.postForm.value;

      if (this.isEditing && this.postId) {
        this.postService.updatePost(this.postId, postData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Post updated successfully'
          });
          this.router.navigate(['/posts']);
        });
      } else {
        this.postService.createPost(postData).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Post created successfully'
          });
          this.router.navigate(['/posts']);
        });
      }
    }
  }
}
