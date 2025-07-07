import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'new', component: PostFormComponent },
  { path: ':id', component: PostDetailComponent },
  { path: 'edit/:id', component: PostFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PostListComponent,
    PostDetailComponent,
    PostFormComponent
  ]
})
export class PostsModule { }
