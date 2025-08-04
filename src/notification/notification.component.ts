import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../Services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load notifications';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe({
      next: (res) => {
        console.log(`Notification ${id} marked as read`, res);
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
  notification.isRead = true;
  const newCount = this.notifications.filter(n => !n.isRead).length;
  this.notificationService.setUnreadCount(newCount);
}
      }
      ,
      error: (err) => {
        console.error(`Failed to mark notification ${id} as read`, err);
        this.error = 'Failed to mark notification as read';
      }
    });
  }

  // markAll():void
  // {
  //   this.notifications.forEach(element => {
  //     element.isRead=true
  //   });
  // }
}
