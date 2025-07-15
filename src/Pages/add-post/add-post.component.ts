import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostService } from '../../Services/post.service';


@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  showModal = false;

  @Output() postAdded = new EventEmitter<Post>();

  description = '';
  isSubmitting = false;
  error: string | null = null;

  selectedFile: File | null = null;
  selectedImageUrl: string | null = null;

  constructor(private postService: PostService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addPost() {
    if (!this.description.trim()) {
      this.error = 'should write post';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formData = new FormData();
    formData.append('content', this.description.trim());
    if (this.selectedFile) {
      formData.append('postImage', this.selectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: (newPost) => {
        this.postAdded.emit(newPost);
        this.resetForm();
        this.isSubmitting = false;
        this.closeModal();
      },
      error: (err) => {
        this.error = 'faild  create post ';
        this.isSubmitting = false;
        console.error('Error creating post:', err);
      }
    });
  }

  resetForm() {
    this.description = '';
    this.error = null;
    this.selectedFile = null;
    this.selectedImageUrl = null;

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  closeModal() {
    const modalElement = document.getElementById('createPostModal');
    if (modalElement) {
      const modal = (window as any).bootstrap?.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
  }
}
