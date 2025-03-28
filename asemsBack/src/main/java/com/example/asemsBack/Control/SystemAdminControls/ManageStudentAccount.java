package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Dto.StudentDTO;
import com.example.asemsBack.Dto.StudentDataDTO;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Service.ClassService;
import com.example.asemsBack.Service.StudentDataService;
import com.example.asemsBack.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class ManageStudentAccount {

    @Autowired
    StudentService studentService;

    @Autowired
    StudentDataService studentDataService;

    @Autowired
    ClassService classService;

    @GetMapping("/students")
    public List<StudentDTO> getStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/class")
    public List<Class> showClasses(){
        return classService.showclasses();
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<StudentDataDTO> getStudentById(@PathVariable Long id) {
        StudentDataDTO student = studentDataService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<StudentDataDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDataDTO studentDto) {
        StudentDataDTO updatedStudent = studentDataService.updateStudent(id, studentDto);
        return ResponseEntity.ok(updatedStudent);
    }

    @GetMapping("/students/search")
    public ResponseEntity<List<StudentDTO>> searchStudentsByUsername(@RequestParam String username) {
        List<StudentDTO> students = studentDataService.searchStudentsByUsername(username);
        return ResponseEntity.ok(students);
    }

}