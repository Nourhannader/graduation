import { Component, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post, PostService } from '../../Services/post.service';
import Modal from 'bootstrap/js/dist/modal';
import { ToastrService } from 'ngx-toastr';
// import { Modal } from 'bootstrap';


@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})


export class AddPostComponent implements OnInit  {

  @ViewChild('createPostModal',{static:false}) createPostModal!: ElementRef;

  @Output() postAdded = new EventEmitter<number>();

  
  description = '';
  isSubmitting = false;
  error: string | null = null;
  selectedFile: File | null = null;
  selectedImageUrl: string | null = null;
  userName:string=''
  image:string=''

  constructor(private postService: PostService , private cd:ChangeDetectorRef,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('username') || ''
    this.image=localStorage.getItem('image') ||''
  }

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
      formData.append('image', this.selectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: (newPost) => {
        this.postAdded.emit(newPost.postId);
        this.resetForm();
        this.isSubmitting = false;
        this.closeModal();
        setTimeout(() => {
          this.toastr.success('post added successfully')
        },500);
        
      },
      error: (err) => {
        this.error = 'faild  create post ';
        this.isSubmitting = false;
        setTimeout(() => {
          this.toastr.error('post added successfully')
        },500);
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

openModal() {
  const modal = new Modal(this.createPostModal.nativeElement);
  modal.show();
}

closeModal() {
  const modal = Modal.getInstance(this.createPostModal.nativeElement);
  if (modal) modal.hide();
}


  onImageError(event: any) {
    event.target.style.display = 'none';
  }
}
