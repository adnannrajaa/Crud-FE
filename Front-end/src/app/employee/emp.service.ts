import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http: HttpClient) { }

  saveEmployee(EmployeeData:any){
    return this.http.post('https://localhost:44315/emp/',EmployeeData)
}

updateEmployee(EmployeeData:any){
  return  this.http.put('https://localhost:44315/emp/',EmployeeData)
}

getEmployee(){
  return this.http.get('https://localhost:44315/emp/');
}

getEmployeebyId(empid:any){
  return this.http.get('https://localhost:44315/emp/' + empid,);
}

delEmployeebyid(empid:any){
  return this.http.delete('https://localhost:44315/emp/' + empid,);
}
}
