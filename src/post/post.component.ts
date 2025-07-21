import { Component, Input, Output, EventEmitter, OnInit, output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PostService, Post, Comment } from '../Services/post.service';
import { EditPostComponent } from '../Pages/edit-post/edit-post.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule,EditPostComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent  {
  @Input() post!: Post;
  @Output() toggleLiked = new EventEmitter<number>();
  @Output() postDeleted = new EventEmitter<string>();
  @Output() postUpdated = new EventEmitter<number>();
  @Output() fireUser=new EventEmitter<number>();

  editing = false;
  showComments = false;
  isLiking = false;
  isDeleting = false;
  isAddingComment = false;
  loadingComments = false;

  // Form data
  editDescription = '';
  editImage = '';
  newComment = '';


  // Comments fetched 
  comments: Comment[] = [];

  // Errors
  error: string | null = null;

  constructor(private postService: PostService, private cdr: ChangeDetectorRef) {}
  
  onUpdate(postId:number){
    this.postUpdated.emit(postId);
  }

  deletePost() {
    if (!confirm('Are you sure you want to delete this post')) return;

    this.isDeleting = true;
    this.postService.deletePost(this.post.postId).subscribe({
      next: () => {
        this.postDeleted.emit(String(this.post.postId));
        this.fireUser.emit(this.post.postId);
      },
      error: (err) => {
        this.error = 'Error deleting post:';
        this.isDeleting = false;
        console.error('Error deleting post:', err);
      }
    });
  }

  toggleLike() {
    this.isLiking = true;

    this.postService.reactToPost(Number(this.post.postId)).subscribe({
      next: (res) => {
        console.log('Post liked/unliked:', res.message);
        this.post.reactCount = res.message === 'added' ? this.post.reactCount + 1 : this.post.reactCount - 1;
        this.fireUser.emit(this.post.postId);
        this.isLiking = false;
      },
      error: (err) => {
        this.error = 'Error toggling like';
        this.isLiking = false;
        console.error('Error toggling like', err);
      }
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;

    if (this.showComments && this.comments.length === 0) {
      this.loadingComments = true;
      this.postService.getComments(this.post.postId).subscribe({
        next: (comments) => {
          console.log('Comments loaded:', comments);
          this.comments = comments;
          this.loadingComments = false;
        },
        error: (err) => {
          this.error = '  Error loading comments: ';
          this.loadingComments = false;
          console.error('Error loading comments:', err);
        }
      });
    }

    // setTimeout(() => {
    //   this.cdr.detectChanges();
    // }, 0);
  }



  addComment() {
    if (!this.newComment.trim()) return;

    this.isAddingComment = true;
    this.error = null;

    const commentData = {
      content: this.newComment.trim(),
      postId: this.post.postId
    };

    this.postService.addComment(commentData).subscribe({
      next: (newComment) => {
        this.getAllComments();
        this.post.commentCount++;
        this.fireUser.emit(this.post.postId);
        this.newComment = '';
        this.isAddingComment = false;
      },
      error: (err) => {
        this.error = '  error adding comment';
        this.isAddingComment = false;
        console.error('Error adding comment:', err);
      }
    });
  }




  deleteComment(commentId: number, index: number) {
    
    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments.splice(index, 1);
        this.post.commentCount--;
        this.fireUser.emit(this.post.postId);
      },
      error: (err) => {
        this.error = '   ';
        console.error('Error deleting comment:', err);
      }
    });
  }

  getAllComments(): void {
    this.postService.getComments(this.post.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => {
        this.error = 'Error loading comments';
        console.error('Error loading comments:', err);
      }
  })
}



  
  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
