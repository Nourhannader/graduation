import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:5267/api/Notification';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Notification[]>(this.apiUrl, { headers });
  }

  markAsRead(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`,  { headers });
  }
}
