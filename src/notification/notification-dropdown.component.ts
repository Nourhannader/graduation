import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../Services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent implements OnInit,OnDestroy{
  private subscriptions: Subscription[] = [];
  showNotifications = false;
  unreadCount = 0;
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
  const sub=this.notificationService.unreadCount$.subscribe(count => {
    this.unreadCount = count;
  });
  this.loadNotifications();
  this.subscriptions.push(sub);
}

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    // if (this.showNotifications) {
    //   this.loadNotifications();
    // }
  }

  loadNotifications(): void {
  const sub=  this.notificationService.getNotifications().subscribe({
      next: (data) => {
        console.log(data)
        this.notifications = data.slice(0, 3); 
        this.unreadCount = data.filter((n: any) => !n.isRead).length;
        this.notificationService.setUnreadCount(this.unreadCount);
      }
    });
    this.subscriptions.push(sub);
  }

  markAsRead(id: number): void {
   const sub= this.notificationService.markAsRead(id).subscribe({
      next: (res) => {
        console.log(res)
        const notification = this.notifications.find(n => n.id === id);
        if (notification) notification.isRead = true;
        this.unreadCount = Math.max(0, this.unreadCount - 1);
        
      },

      error: (err) => {
        console.error('Error marking notification as read:', err);
      }
    });
    this.subscriptions.push(sub);

  }

  cancelShow()
  {
    this.showNotifications=false
  }

  ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions=[]
}
}
