import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../model/employee.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
 employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.employeeService.getEmployee(username).subscribe((emp:any) => {
        if (emp) {
          this.employee = emp;
        } else {
          this.toastr.error('Could not find the requested employee.', 'Error');
          this.router.navigate(['/employees']);
        }
      });
    }
  }
}
