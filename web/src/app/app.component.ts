import { AuthService } from './authentication/_services/auth.service';
import { TokenStorageService } from './authentication/_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web';
  public isLoggedIn: boolean;
  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.authService.authEvent.subscribe(() => {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    })

  }
}
