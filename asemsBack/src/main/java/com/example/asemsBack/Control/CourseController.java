package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Course;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.DepartmentCourse;
import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Service.CourseService;
import com.example.asemsBack.Service.DepartmentHeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    CourseService courseService;

    @Autowired
    DepartmentHeadService departmentHeadService;

    @PostMapping("/course")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        // Get the authenticated DepartmentHead
        String username = getAuthenticatedUsername();

        // Fetch the DepartmentHead entity by username
        DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);

        if (departmentHead != null && departmentHead.getDepartment() != null) {
            Department department = departmentHead.getDepartment();


            Course savedCourse = courseService.SaveCourses(course);


            DepartmentCourse departmentCourse = new DepartmentCourse();
            departmentCourse.setCourse(savedCourse);   // Set the saved course
            departmentCourse.setDepartment(department);  // Set the department from the department head

            // Add the DepartmentCourse to the Course's relationship
            savedCourse.getDepartmentCourses().add(departmentCourse);  // Adding the relationship

            // Save the DepartmentCourse association
            courseService.saveDepartmentCourse(departmentCourse);  // You need to implement this method in your service

            return ResponseEntity.ok(savedCourse);
        } else {
            return ResponseEntity.badRequest().body("Department not found for the authenticated user");
        }
    }

    private String getAuthenticatedUsername() {
        // You can fetch the authenticated username using SecurityContextHolder or other methods
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName(); // Assumes username is stored in SecurityContext
    }

    @GetMapping("/course")
    public List<Course> getCourses() {
        // Get authenticated user's username
        String username = getAuthenticatedUsername();

        // Fetch the DepartmentHead based on the username
        DepartmentHead departmentHead = departmentHeadService.getDepartmentHeadByUsername(username);

        if (departmentHead != null && departmentHead.getDepartment() != null) {
            // Fetch the Department ID from DepartmentHead
            long departmentId = departmentHead.getDepartment().getId();

            // Fetch all courses associated with the department
            List<Course> departmentCourses = courseService.getCoursesByDepartmentId(departmentId);

            return departmentCourses;  // Return the list of courses associated with the department
        } else {
            // If no department is found for the authenticated user, return an empty list or error response
            return new ArrayList<>();
        }
    }


}