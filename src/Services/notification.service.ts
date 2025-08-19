import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface Notification {
  id: number;
  massage: string;
  isRead: boolean;
  sender: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://livana.runasp.net/api/Notification';

  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Notification[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.get<Notification[]>(this.apiUrl, { headers });
  }

  markAsRead(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem("token")}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`, {} , { headers });
  }

  setUnreadCount(count: number): void {
    this.unreadCountSubject.next(count);
  }
}
