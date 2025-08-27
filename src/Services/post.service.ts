import { Comm } from './community.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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
  private baseUrl=environment.apiUrl;
  constructor(private http: HttpClient) {}

 
  getAllPosts(): Observable<Post[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Post[]>(`${this.baseUrl}/Post`, { headers });
  }

  getPostById(postId:number):Observable<GetPost> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<GetPost>(`${this.baseUrl}/Post/${postId}`, { headers });
  }
  
  
  createPost(postData: FormData): Observable<AddPostResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<AddPostResponse>(`${this.baseUrl}/Post`, postData, { headers });
  }

  
  updatePost(postId: number, postData:FormData): Observable<postEdit> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<postEdit>(`${this.baseUrl}/Post/${postId}`, postData, { headers });
  }

  
  deletePost(postId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`${this.baseUrl}/Post/${postId}`, { headers });
  }

  ////////////
  
  reactToPost(postId: number): Observable<PostResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<PostResponse>(`${this.baseUrl}/React`,{postId}, { headers });
  }

  
  getComments(postId: number): Observable<Comment[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Comment[]>(`${this.baseUrl}/Comment/${postId}`, { headers });
  }

  addComment( commentData: { content: string }): Observable<CommentResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<CommentResponse>(`${this.baseUrl}/Comment`, commentData, { headers });
  }

  updateComment(commentId: number, content: string): Observable<Comment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<Comment>(`${this.baseUrl}/Comment/${commentId}`, { content }, { headers });
  }

  deleteComment(commentId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`${this.baseUrl}/Comment/${commentId}`, { headers });
  }

}