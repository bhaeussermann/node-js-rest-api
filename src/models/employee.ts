export interface Employee {
  lastName: string;
  firstName: string;
  title: string;
}
  
export interface EmployeeWithId extends Employee {
  id: number;
}
