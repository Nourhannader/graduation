import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../Services/notification.service';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification-dropdown.component.html',
  styleUrls: ['./notification-dropdown.component.css']
})
export class NotificationDropdownComponent {
  showNotifications = false;
  unreadCount = 0;
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        this.notifications = data.slice(0, 5); 
        this.unreadCount = data.filter((n: any) => !n.isRead).length;
      }
    });
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe({
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

  }

  cancelShow()
  {
    this.showNotifications=false
  }
}
