import { Component } from '@angular/core';

@Component({
  selector: 'app-owner-top-bar',
  imports: [],
  templateUrl: './owner-top-bar.component.html',
  styleUrl: './owner-top-bar.component.css'
})
export class OwnerTopBarComponent {
imageName: string = "03c3051a-c275-4705-baa6-195ec7be43b9.jpg";
image1: string = `http://localhost:5267/Images/${this.imageName}`;

}
