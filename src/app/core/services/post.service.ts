import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.http.get<Post[]>(`${this.apiUrl}/posts`).subscribe(posts => {
      this.postsSubject.next(posts);
    });
  }

  getPosts(): Observable<Post[]> {
    return this.posts$;
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return new Observable(subscriber => {
      this.http.post<Post>(`${this.apiUrl}/posts`, post).subscribe(newPost => {
        const currentPosts = this.postsSubject.value;
        this.postsSubject.next([newPost, ...currentPosts]);
        subscriber.next(newPost);
        subscriber.complete();
      });
    });
  }

  updatePost(id: number, post: Omit<Post, 'id'>): Observable<Post> {
    return new Observable(subscriber => {
      this.http.put<Post>(`${this.apiUrl}/posts/${id}`, post).subscribe(updatedPost => {
        const currentPosts = this.postsSubject.value;
        const updatedPosts = currentPosts.map(p => p.id === id ? updatedPost : p);
        this.postsSubject.next(updatedPosts);
        subscriber.next(updatedPost);
        subscriber.complete();
      });
    });
  }

  deletePost(id: number): Observable<void> {
    return new Observable(subscriber => {
      this.http.delete<void>(`${this.apiUrl}/posts/${id}`).subscribe(() => {
        const currentPosts = this.postsSubject.value;
        const updatedPosts = currentPosts.filter(post => post.id !== id);
        this.postsSubject.next(updatedPosts);
        subscriber.next();
        subscriber.complete();
      });
    });
  }
}
