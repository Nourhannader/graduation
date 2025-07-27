import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenterHistoryComponent } from '../renter-history/renter-history.component';
import { UnpaidRentsComponent } from '../unpaid-rents/unpaid-rents.component';


@Component({
  selector: 'app-renter-tabs',
  standalone: true,
  imports: [CommonModule, RenterHistoryComponent, UnpaidRentsComponent],
  templateUrl: './renter-tabs.component.html',
  styleUrls: ['./renter-tabs.component.css']
})
export class RenterTabsComponent {
  activeTab: string = 'history'; 

  selectTab(tab: string) {
    this.activeTab = tab;
  }

}

