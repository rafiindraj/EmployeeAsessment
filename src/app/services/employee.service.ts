import { Employee } from './../model/employee.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private mockEmployees: Employee[] = [
        {
            username: 'john.doe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            birthDate: '1990-05-15',
            basicSalary: 60000,
            status: 'Active',
            group: 'Developers',
            description: '2022-01-10'
        },
        {
            username: 'jane.smith',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            birthDate: '1992-08-22',
            basicSalary: 75000,
            status: 'Active',
            group: 'Designers',
            description: '2021-11-20'
        },
        {
            username: 'peter.jones',
            firstName: 'Peter',
            lastName: 'Jones',
            email: 'peter.jones@example.com',
            birthDate: '1988-12-01',
            basicSalary: 82000,
            status: 'Inactive',
            group: 'Project Managers',
            description: '2020-03-15'
        }
    ];

    constructor() { }

    getEmployees(): Observable<Employee[]> {
        return of(this.mockEmployees);
    }

    getEmployee(username: string): Observable<Employee | undefined> {
        const employee = this.mockEmployees.find(e => e.username === username);
        return of(employee);
    }

    addEmployee(employee: Employee): Observable<Employee> {
        this.mockEmployees.push(employee);
        return of(employee);
    }
}