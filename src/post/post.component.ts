import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService, Post, Comment } from '../Services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<string>();
  @Output() postUpdated = new EventEmitter<Post>();

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



  toggleEdit() {
    if (!this.editing) {
      this.editDescription = this.post.content;
      this.editImage = this.post.postImage || '';
    }
    this.editing = !this.editing;
    this.error = null;
  }

  saveEdit() {
    if (!this.editDescription.trim()) {
      this.error = 'post fill';
      return;
    }

    const updateData = {
      content: this.editDescription.trim(),
      postImage: this.editImage.trim() || undefined
    };

    this.postService.updatePost(this.post.postId, updateData).subscribe({
      next: (updatedPost) => {
        this.postUpdated.emit(updatedPost);
        this.editing = false;
        this.error = null;
      },
      error: (err) => {
        
        this.error = 'Error updating post' ;
        console.error('Error updating post', err);
      }
    });
  }

  cancelEdit() {
    this.editing = false;
    this.editDescription = '';
    this.editImage = '';
    this.error = null;
  }

  deletePost() {
    if (!confirm('Are you sure you want to delete this post')) return;

    this.isDeleting = true;
    this.postService.deletePost(this.post.postId).subscribe({
      next: () => {
        this.postDeleted.emit(String(this.post.postId));
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
      next: (updatedPost) => {
        this.postUpdated.emit(updatedPost);
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

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
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
        this.comments.push(newComment);
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
    if (!confirm('  are you sure for deleting comment  ')) return;

    this.postService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments.splice(index, 1);
      },
      error: (err) => {
        this.error = '   ';
        console.error('Error deleting comment:', err);
      }
    });
  }



  getUserAvatar(user: any): string {
    return user?.avatar || 'https://via.placeholder.com/40x40/667eea/ffffff?text=U';
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
