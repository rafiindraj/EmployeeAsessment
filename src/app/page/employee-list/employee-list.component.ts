import { FormsModule } from '@angular/forms';
import { Employee } from './../../model/employee.model';
import { EmployeeService } from './../../services/employee.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
 allEmployees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;

  sortColumn: keyof Employee | null = 'basicSalary';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.allEmployees = data;
      this.updateDisplayedData();
    });
  }

  updateDisplayedData(): void {
    // Filter
    let filteredData = this.allEmployees.filter(employee =>
      employee.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sort
    if (this.sortColumn) {
      filteredData.sort((a, b) => {
        const valA = a[this.sortColumn!];
        const valB = b[this.sortColumn!];
        const comparison = valA < valB ? -1 : valA > valB ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Paginate
    this.totalPages = Math.ceil(filteredData.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = filteredData.slice(startIndex, endIndex);
  }

  sortBy(column: keyof Employee): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
    this.updateDisplayedData();
  }
  
  onSearchChange(): void {
    this.currentPage = 1;
    this.updateDisplayedData();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedData();
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