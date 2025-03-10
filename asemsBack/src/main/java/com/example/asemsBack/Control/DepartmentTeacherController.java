package com.example.asemsBack.Control;

import com.example.asemsBack.Service.DepartmentTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentTeacherController {
    @Autowired
    DepartmentTeacherService departmentTeacherService;
    @PostMapping("/associate")
    public ResponseEntity<String> associateTeacherWithDepartment(@RequestBody Map<String, Long> request) {
        try {
            departmentTeacherService.associateTeacherWithDepartment(request);
            return ResponseEntity.ok("Teacher associated with department successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
