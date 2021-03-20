import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpService } from './emp.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employeeForm: FormGroup;
  employeelist:any;
  empid:any;
  
  btnsave:any= 'save';
  constructor(private fb: FormBuilder, private http: HttpClient,
    private empservice: EmpService
    ) { }

  ngOnInit(): void {
  this.employeeForm = this.fb.group({
    name:[''],
    email:[''],
    password:['']
  });
 
  this.GetEmployeeData(); 
}
OnSubmit(){
  if(this.empid && this.empid>0){

    const empdataforupdate = {id:this.empid,name: this.employeeForm.controls.name.value,
    
                                 email:this.employeeForm.controls.email.value,
                                 password:this.employeeForm.controls.password.value };
      this.empservice.updateEmployee(empdataforupdate).subscribe(data => {
        this.GetEmployeeData();
        this.employeeForm.reset();
        this.btnsave= 'Save';
      })                           

  }else{
    this.empservice.saveEmployee(this.employeeForm.value).subscribe(data =>{
      this.employeeForm.reset();
    });
  }
  
}
GetEmployeeData(){
  this.empservice.getEmployee().subscribe(data =>{
    this.employeelist = data;
  });


}

edit(id:any){
 this.empservice.getEmployeebyId(id).subscribe(data =>{
   this.empid = id;
   this.btnsave = 'Update';
   this.employeeForm.patchValue(data);});
}

delete(id:any){
  this.empservice.delEmployeebyid(id).subscribe(data =>{
    this.GetEmployeeData();
  })
}
}