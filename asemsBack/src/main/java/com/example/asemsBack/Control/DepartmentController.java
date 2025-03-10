package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Repository.DepartmentRepo;
import com.example.asemsBack.Service.DepartmentService;
import com.example.asemsBack.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/teacher")
    public List<Teacher> getInstructor(){
        List<Teacher> TeachersList=teacherService.getAllTeachers();
        return TeachersList;
    }

    @Autowired
    DepartmentRepo departmentRepo;

    @PostMapping("/department")
    public ResponseEntity<String> addDepartment(@RequestBody Department department){
        departmentService.addDapartment(department);
        return ResponseEntity.ok("Teacher assigned to course successfully");
    }

  @GetMapping("/department")
  public List<Department> ShowDepartments(){
        return departmentRepo.findAll();
  }


    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping("/departments")
    public List<DepartmentDto> getDepartmentsWithTeachers() {
        return departmentService.getAllDepartmentsWithTeachers();
    }


}