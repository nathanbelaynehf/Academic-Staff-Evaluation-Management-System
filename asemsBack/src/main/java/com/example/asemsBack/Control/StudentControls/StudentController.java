package com.example.asemsBack.Control.StudentControls;

import com.example.asemsBack.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/enrollments")
    public List<StudentService.EnrollmentResponse> getStudentEnrollments() {
        // Call the service to get the student's enrollments
        return studentService.getEnrollmentsForAuthenticatedStudent();
    }
}