import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ratingstar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './ratingstar.component.html',
  styleUrl: './ratingstar.component.scss'
})
export class RatingstarComponent {
   @Input() rating!: number ;

  getStarArray(): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < this.rating);
  }
}
