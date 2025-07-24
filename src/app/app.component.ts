import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OwnerComponent } from '../Pages/owner/owner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,OwnerComponent,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graduation';
}
