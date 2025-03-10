package com.example.asemsBack.Control;

import com.example.asemsBack.Service.TeacherCourseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherCourseController {
    @Autowired
    TeacherCourseServices teacherCourseServices;

    @PostMapping("/assign")
    public ResponseEntity<String> assignTeachersToCourses(@RequestBody List<Map<String, Long>> requests) {
        try {
            for (Map<String, Long> request : requests) {
                Long teacherId = request.get("teacherId");
                Long courseId = request.get("courseId");
                Long classId = request.get("classId");

                // Call the service method to handle the assignment
                teacherCourseServices.assignTeacherToCourse(teacherId, courseId, classId);
            }
            return ResponseEntity.ok("Teachers assigned to courses successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}
