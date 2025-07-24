import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdsSingleComponent } from '../ads-single/ads-single.component';



@Component({
  selector: 'app-advertisements',
  imports: [CommonModule,AdsSingleComponent],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.scss'
})
export class AdvertisementsComponent {
  showPrice = false;
  showBeds = false;
  showTypes = false;

  toggle(dropdown: string) {
    this.showPrice = dropdown === 'price' ? !this.showPrice : false;
    this.showBeds = dropdown === 'beds' ? !this.showBeds : false;
    this.showTypes = dropdown === 'types' ? !this.showTypes : false;
  }
}
