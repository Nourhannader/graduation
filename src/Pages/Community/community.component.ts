import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService, Post } from '../../Services/post.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { PostComponent } from '../../post/post.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule,PostComponent, AddPostComponent],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: (res: Post[]) => {
        this.posts = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'error loading data';
        this.loading = false;
      },
    });
  }

  onPostAdded(post: Post) {
    this.posts = [post, ...this.posts];
  }

  onPostDeleted(postId: string) {
    this.posts = this.posts.filter(p => p.postId !== Number(postId));
  }

  onPostUpdated(updated: Post) {
    this.posts = this.posts.map(p => p.postId=== updated.postId ? updated : p);
  }
}
