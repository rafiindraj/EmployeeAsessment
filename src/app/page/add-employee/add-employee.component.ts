import { EmployeeService } from './../../services/employee.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

   employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.employeeForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      basicSalary: new FormControl(null, [Validators.required, Validators.min(0)]),
      status: new FormControl('Active', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  get f() { return this.employeeForm.controls; }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.toastr.error('Please fill out all required fields correctly.', 'Form Invalid');
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
      this.toastr.success('New employee has been added successfully!', 'Employee Created');
      this.router.navigate(['/employees']);
    });
  }

}
