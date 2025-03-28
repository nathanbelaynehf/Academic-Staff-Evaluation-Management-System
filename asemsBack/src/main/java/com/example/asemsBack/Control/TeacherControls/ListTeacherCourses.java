package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Dto.TeacherCourseDTO;
import com.example.asemsBack.Service.TeacherCourseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/teach")
@CrossOrigin(origins = "http://localhost:5173")
public class ListTeacherCourses {
   @Autowired
    TeacherCourseServices teacherCourseServices;

    @GetMapping("/courses")
    public ResponseEntity<?> getCoursesForInstructor() {
        try {
            List<TeacherCourseDTO> courses = teacherCourseServices.getCoursesForInstructor();
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to fetch courses: " + e.getMessage()));
        }
    }

}