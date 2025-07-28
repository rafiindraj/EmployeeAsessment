import { Employee } from './../../model/employee.model';
import { EmployeeService } from './../../services/employee.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  navigateToAddEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  viewEmployeeDetails(username: string): void {
    this.router.navigate(['/employees', username]);
  }
}