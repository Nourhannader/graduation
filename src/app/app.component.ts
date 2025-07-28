import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OwnerComponent } from '../Pages/owner/owner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatComponent } from '../Pages/Chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,OwnerComponent,NavbarComponent,FooterComponent,ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graduation';
}
