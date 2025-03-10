package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Student;
import com.example.asemsBack.Service.CourseAddandDropService;
import com.example.asemsBack.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reg")
@CrossOrigin(origins = "http://localhost:5173")
public class AllStudents {
    @Autowired
    StudentService studentService;

    @Autowired
    CourseAddandDropService courseAddandDropService;

    @GetMapping("/students")
    public List<StudentDTO> getStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/teacherCourse")
    public List<TeacherCourseDTO> getCourses(){
        return courseAddandDropService.getAllCourses();
    }

    @PostMapping("/enrollment/{studentId}/add")
    public ResponseEntity<String> addCourseToStudent(@PathVariable Long studentId, @RequestBody Long courseId) {
        courseAddandDropService.addCourse(studentId, courseId);
        return ResponseEntity.ok("Course added successfully");
    }

    @DeleteMapping("/enrollment/{studentId}/drop/{courseId}")
    public ResponseEntity<String> dropCourseFromStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        courseAddandDropService.dropCourse(studentId, courseId);
        return ResponseEntity.ok("Course dropped successfully");
    }



}