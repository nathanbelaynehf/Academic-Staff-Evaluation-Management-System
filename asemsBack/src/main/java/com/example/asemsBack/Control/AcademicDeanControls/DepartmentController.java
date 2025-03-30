package com.example.asemsBack.Control.AcademicDeanControls;

import com.example.asemsBack.Dto.DepartmentDto;
import com.example.asemsBack.Dto.TeacherDto;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Repository.DepartmentRepo;
import com.example.asemsBack.Service.DepartmentService;
import com.example.asemsBack.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @Autowired
    private TeacherService teacherService;

    @GetMapping("/teacher")
    public List<TeacherDto> getInstructor() {
        return teacherService.getAllTeachers();
    }

    @Autowired
    DepartmentRepo departmentRepo;

    @PostMapping("/department")
    public ResponseEntity<String> addDepartment(@RequestBody Department department){
        departmentService .addDepartment(department);
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