import { Employee } from './../model/employee.model';
import { Injectable } from '@angular/core';
import { of, Observable, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private dataUrl = 'assets/data/mock-employees.json';
  private employees: Employee[] = [];

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    if (this.employees.length > 0) {
      return of(this.employees);
    }
    return this.http.get<Employee[]>(this.dataUrl).pipe(
      tap(data => this.employees = data)
    );
  }

  getEmployee(username: string): Observable<Employee | undefined> {
    return this.getEmployees().pipe(
      map(employees => employees.find(e => e.username === username))
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    this.employees.unshift(employee);
    return of(employee);
  }
}