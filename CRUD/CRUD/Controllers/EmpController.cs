using CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public EmpController(DatabaseContext context)
        {
            _context = context;
        }
       
        [HttpGet]
        public ActionResult<List<Employee>> Get()
        {
            return Ok(_context.Employee.ToList()); 
                
        }
        [Route("{id}")]
        [HttpGet]
        public ActionResult<Employee> Get(int id)
        {
            
             var employee=_context.Employee.FirstOrDefault(a => a.id == id);
            return Ok(employee);
        }

        [HttpPost]
        public ActionResult<Employee> Post(Employee employee)
        {
            _context.Employee.Add(employee);
             _context.SaveChanges();
            return Ok(employee);

        }

        [HttpPut]
        public ActionResult<Employee> Put(Employee employee)
        {
           var employeeInDb = _context.Employee.FirstOrDefault(a => a.id == employee.id);
            employeeInDb.name = employee.name;
            employeeInDb.password = employee.password;
            employeeInDb.email = employee.email;
            _context.SaveChanges();
            return Ok(employee);
        }
        [Route("{id}")]
        [HttpDelete]
        public ActionResult<Employee> Delete(int id)
        {
            var employeeInDb = _context.Employee.FirstOrDefault(a => a.id ==id);
            _context.Remove(employeeInDb);
            _context.SaveChanges();
            return Ok(employeeInDb);
           
        }
    }

    
}
