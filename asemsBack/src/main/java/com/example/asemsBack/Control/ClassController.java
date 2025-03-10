package com.example.asemsBack.Control;

import com.example.asemsBack.Model.*;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Repository.ClassRepo;
import com.example.asemsBack.Repository.CourseRepo;
import com.example.asemsBack.Repository.TeacherCourseRepo;
import com.example.asemsBack.Service.ClassService;
import com.example.asemsBack.Service.DepartmentHeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class ClassController {

    @Autowired
    ClassService classService;

    @Autowired
    ClassRepo classRepo;

    @Autowired
    CourseRepo courseRepo;

    @Autowired
    TeacherCourseRepo teacherCourseRepo;

    @Autowired
    DepartmentHeadService departmentHeadService;

    @PostMapping("/class")
    public ResponseEntity<?> addClass(@RequestBody Map<String, Object> requestBody) {
        try {
            String className = (String) requestBody.get("className");
            String program = (String) requestBody.get("program");

            String username = getAuthenticatedUsername();

            // Fetch the DepartmentHead entity by username
            DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);

            if (departmentHead != null && departmentHead.getDepartment() != null) {
                Department department = departmentHead.getDepartment();

                long departmentId = departmentHead.getDepartment().getId();

            Class newClass = new Class();
            newClass.setClassName(className);
            newClass.setProgram(program);

            Class savedClass = classService.saveClass(newClass, departmentId);
            return ResponseEntity.ok(savedClass);}
            else{
                return ResponseEntity.badRequest().body("Department not found for the authenticated user");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding class: " + e.getMessage());
        }
    }

    @GetMapping("/class/{classId}/courses")
    public ResponseEntity<List<TeacherCourseDTO>> getCoursesByClassId(@PathVariable Long classId) {
        try {
            List<TeacherCourse> courses = teacherCourseRepo.findByClassIdAndActiveSemester(classId);

            // Convert TeacherCourse entities to DTOs
            List<TeacherCourseDTO> response;
            response = courses.stream()
                    .map(tc -> new TeacherCourseDTO(
                            tc.getTeacher().getUsername(),
                            tc.getCourse().getCourseName()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    private String getAuthenticatedUsername() {
        // You can fetch the authenticated username using SecurityContextHolder or other methods
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Assumes username is stored in SecurityContext
    }


    @GetMapping("/class")
    public List<Class> showClasses() {
        // Get authenticated user's username
        String username = getAuthenticatedUsername();

        // Fetch the DepartmentHead based on the username
        DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);

        if (departmentHead != null && departmentHead.getDepartment() != null) {
            // Fetch the Department ID from DepartmentHead
            long departmentId = departmentHead.getDepartment().getId();

            // Fetch all classes associated with the department
            List<Class> departmentClasses = classService.getClassesByDepartmentId(departmentId);

            return departmentClasses;  // Return the list of classes associated with the department
        } else {
            // If no department is found for the authenticated user, return an empty list or error response
            return new ArrayList<>();
        }
    }
}
