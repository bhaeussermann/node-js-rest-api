export class EmployeeNotFoundError extends Error {
  constructor(employeeId: number) {
    super(`Employee with ID ${employeeId} not found.`);
  }
}
