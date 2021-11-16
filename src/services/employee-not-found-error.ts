export class EmployeeNotFoundError extends Error {
  constructor(employeeId: number) {
    super(`Employee with ID ${employeeId} not found.`);
    // Restore prototype chain so `instanceof` will work (see https://stackoverflow.com/a/48342359/359765)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
