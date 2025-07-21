import { Comm } from './community.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface Post {
  postId: number;
  content: string;
  postImage?: string;
  reactCount: number;
  commentCount: number;
  userName: string;
  userImage: string;
  publishDate: Date;
}

export interface Comment {
  commentId: number;
  content: string;
  userName: string;
  userImage: string;
  publishDate: Date;
}

export interface PostResponse {
  message: string;
}

export interface CommentResponse {
  message: string;
  commentId: number;
}

export interface AddPostResponse {
  message: string;  
  postId: number;
}

export interface postEdit{
  message: string;
  postId: number;
}

export interface GetPost{
  content:string;
  image:string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) {}

  // ✅ جلب كل البوستات (من غير الكومنتات)
  getAllPosts(): Observable<Post[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Post[]>('http://localhost:5267/api/Post', { headers });
  }

  getPostById(postId:number):Observable<GetPost> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<GetPost>(`http://localhost:5267/api/Post/${postId}`, { headers });
  }
  
  // ✅ إضافة بوست جديد
  createPost(postData: FormData): Observable<AddPostResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<AddPostResponse>('http://localhost:5267/api/Post', postData, { headers });
  }

  // ✅ تعديل بوست
  updatePost(postId: number, postData:FormData): Observable<postEdit> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<postEdit>(`http://localhost:5267/api/Post/${postId}`, postData, { headers });
  }

  // ✅ حذف بوست
  deletePost(postId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`http://localhost:5267/api/Post/${postId}`, { headers });
  }

  ////////////
  // ✅ إضافة أو إزالة لايك (React Toggle)
  reactToPost(postId: number): Observable<PostResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<PostResponse>(`http://localhost:5267/api/React`,{postId}, { headers });
  }

  // ✅ جلب كل الكومنتات الخاصة ببوسـت
  getComments(postId: number): Observable<Comment[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Comment[]>(`http://localhost:5267/api/Comment/${postId}`, { headers });
  }

  addComment( commentData: { content: string }): Observable<CommentResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<CommentResponse>(`http://localhost:5267/api/Comment`, commentData, { headers });
  }

  updateComment(commentId: number, content: string): Observable<Comment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<Comment>(`http://localhost:5267/api/Comment/${commentId}`, { content }, { headers });
  }

  deleteComment(commentId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`http://localhost:5267/api/Comment/${commentId}`, { headers });
  }

}