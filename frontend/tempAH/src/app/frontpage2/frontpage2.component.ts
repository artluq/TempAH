import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-frontpage2',
  templateUrl: './frontpage2.component.html',
  styleUrls: ['./frontpage2.component.css']
})
export class Frontpage2Component implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.logout(); // Use the AuthService to log out
  }
  
}
