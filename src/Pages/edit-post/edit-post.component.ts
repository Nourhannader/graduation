import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Output, ViewChild, EventEmitter, inject, input, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../Services/post.service';


@Component({
  selector: 'app-edit-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent implements OnInit {

  description = '';
  isSubmitting = false;
  error: string | null = null;
  selectedFile: File | null = null;
  selectedImageUrl: string | null = null;
  userName:string=''
  image:string=''

  _postService=inject(PostService);

  @Input() postId!: number;
  @ViewChild('createPostModal',{static:false}) createPostModal!: ElementRef;
  @Output() postedited = new EventEmitter<number>();


  ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || ''
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

  editPost() {
    if (!this.description.trim()) {
      this.error = 'should write post';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formData = new FormData();
    formData.append('content', this.description.trim());
    if(this.selectedImageUrl?.startsWith('http')){
      formData.append('image','');
    }
    else if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    this._postService.updatePost(this.postId,formData).subscribe({
      next: (res) => {
        this.postedited.emit(res.postId);
        this.closeModal();
      },
      error: (err) => {
        this.error = 'Failed to edit post';
        console.error(err);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
     
  }

  // openModal() {
  //   this.getPost();
  //   const modal = new Modal(this.createPostModal.nativeElement);
  //   modal.show();
  // }
  
  closeModal() {
    const modal = Modal.getInstance(this.createPostModal.nativeElement);
    if (modal) modal.hide();
  }
  
  
  onImageError(event: any) {
    event.target.style.display = 'none';
  }

  openModal(){
    this._postService.getPostById(this.postId).subscribe({
      next: (post) => {
        console.log(post)
        this.description = post.content;
        this.selectedImageUrl = post.image || '';
        this.selectedImageUrl= 'http://localhost:5267/Images/' + this.selectedImageUrl

         const modal = new Modal(this.createPostModal.nativeElement);
         modal.show();
      },
      error: (err) => {
        this.error = 'Failed to load post';
        console.error(err);
      }
    });
  }

}
