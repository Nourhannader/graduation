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

 
  getAllPosts(): Observable<Post[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Post[]>('http://livana.runasp.net/api/Post', { headers });
  }

  getPostById(postId:number):Observable<GetPost> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<GetPost>(`http://livana.runasp.net/api/Post/${postId}`, { headers });
  }
  
  
  createPost(postData: FormData): Observable<AddPostResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<AddPostResponse>('http://livana.runasp.net/api/Post', postData, { headers });
  }

  
  updatePost(postId: number, postData:FormData): Observable<postEdit> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<postEdit>(`http://livana.runasp.net/api/Post/${postId}`, postData, { headers });
  }

  
  deletePost(postId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`http://livana.runasp.net/api/Post/${postId}`, { headers });
  }

  ////////////
  
  reactToPost(postId: number): Observable<PostResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<PostResponse>(`http://livana.runasp.net/api/React`,{postId}, { headers });
  }

  
  getComments(postId: number): Observable<Comment[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Comment[]>(`http://livana.runasp.net/api/Comment/${postId}`, { headers });
  }

  addComment( commentData: { content: string }): Observable<CommentResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.post<CommentResponse>(`http://livana.runasp.net/api/Comment`, commentData, { headers });
  }

  updateComment(commentId: number, content: string): Observable<Comment> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<Comment>(`http://livana.runasp.net/api/Comment/${commentId}`, { content }, { headers });
  }

  deleteComment(commentId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.delete<void>(`http://livana.runasp.net/api/Comment/${commentId}`, { headers });
  }

}