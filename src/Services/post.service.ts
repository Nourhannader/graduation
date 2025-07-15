import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface Post {
  postId: string;
  content: string;
  postImage?: string;
  reactCount: number;
  userName: string;
  userImage: string;
  publishDate: Date;
}

export interface Comment {
  commentId: string;
  content: string;
  userName: string;
  userImage: string;
  publishDate: Date;
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

  // ✅ إضافة بوست جديد
  createPost(postData: FormData): Observable<Post> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<Post>('http://localhost:5267/api/Post', postData, { headers });
  }

  // ✅ تعديل بوست
  updatePost(postId: string, postData: { content: string; postImage?: string }): Observable<Post> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<Post>(`http://localhost:5267/api/Post/${postId}`, postData, { headers });
  }

  // ✅ حذف بوست
  deletePost(postId: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`http://localhost:5267/api/Post/${postId}`, { headers });
  }

  // ✅ إضافة أو إزالة لايك (React Toggle)
  reactToPost(postId: string): Observable<Post> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<Post>(`http://localhost:5267/api/Post/${postId}/react`, {}, { headers });
  }

  // ✅ جلب كل الكومنتات الخاصة ببوسـت
  getComments(postId: string): Observable<Comment[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Comment[]>(`http://localhost:5267/api/Post/${postId}/comments`, { headers });
  }

  // ✅ إضافة تعليق
  addComment(postId: string, commentData: { content: string }): Observable<Comment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<Comment>(`http://localhost:5267/api/Post/${postId}/comments`, commentData, { headers });
  }

  // ✅ تعديل تعليق
  updateComment(commentId: string, content: string): Observable<Comment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<Comment>(`http://localhost:5267/api/Comment/${commentId}`, { content }, { headers });
  }

  // ✅ حذف تعليق
  deleteComment(commentId: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`http://localhost:5267/api/Comment/${commentId}`, { headers });
  }

}