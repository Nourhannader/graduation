import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OwnerComponent } from '../Pages/owner/owner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,OwnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graduation';
}
