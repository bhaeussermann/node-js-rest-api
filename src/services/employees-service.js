'use strict';

import { EmployeeNotFoundError } from './employee-not-found-error.js';

export class EmployeesService {
  constructor() {
    this.employees = [
      {
        id: 0,
        lastName: 'Peacock',
        firstName: 'Margaret',
        title: 'Sales Representative'
      },
      {
        id: 1,
        lastName: 'Fuller',
        firstName: 'Andrew',
        title: 'Vice President, Sales'
      }
    ];
  }

  getAll() {
    return this.employees;
  }

  async get(employeeId) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const employee = this.employees.find(e => e.id === employeeId);
    if (!employee) throw new EmployeeNotFoundError(employeeId);
    return employee;
  }

  add(employeeDetails) {
    const maximumId = this.employees
      .map(e => e.id)
      .reduce((maxId, currentId) => currentId > maxId ? currentId : maxId);
    const employeeId = maximumId + 1;
    this.employees.push({
      id: employeeId,
      ...employeeDetails
    });
    return employeeId;
  }

  update(employeeId, employeeDetailsToUpdate) {
    const employeeIndex = this.employees.findIndex(e => e.id === employeeId);
    if (employeeIndex === -1) throw new EmployeeNotFoundError(employeeId);

    this.employees[employeeIndex] = {
      ...this.employees[employeeIndex],
      ...employeeDetailsToUpdate
    };
  }

  delete(employeeId) {
    const employeeIndex = this.employees.findIndex(e => e.id === employeeId);
    if (employeeIndex === -1) throw new EmployeeNotFoundError(employeeId);

    this.employees.splice(employeeIndex, 1);
  }
}
