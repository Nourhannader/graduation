import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { OwnerComponent } from '../Pages/owner/owner.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatComponent } from '../Pages/Chat/chat.component';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,OwnerComponent,NavbarComponent,FooterComponent,ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graduation';

  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }

  shouldHideLayout(): boolean {
    return this.currentUrl.startsWith('/login') || 
    this.currentUrl.startsWith('/register') || 
    this.currentUrl.startsWith('/adminHome') ||
    this.currentUrl.startsWith('/404') ;
  }
}
