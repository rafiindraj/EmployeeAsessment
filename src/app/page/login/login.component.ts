import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/employees']);
    }
  }

  onSubmit() {
    // Basic validation
    if (!this.username.trim()) {
      alert('Username is required!');
      return;
    }

    if (!this.password.trim()) {
      alert('Password is required!');
      return;
    }

    if (this.username.trim().length < 3) {
      alert('Username must be at least 3 characters long!');
      return;
    }

    if (this.password.trim().length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      this.toastr.success('You are being redirected.', 'Login Successful!');
    } else {
      this.toastr.error('Invalid credentials.', 'Login Failed');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.username)) {
      alert('Please enter a valid email address!');
      return;
    }

    const loginSuccess = this.authService.login(this.username, this.password);
    
    if (loginSuccess) {
      alert(`Login successful! Welcome, ${this.username}`);
      this.router.navigate(['/employees']);
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }

  onReset() {
    this.username = '';
    this.password = '';
  }
}