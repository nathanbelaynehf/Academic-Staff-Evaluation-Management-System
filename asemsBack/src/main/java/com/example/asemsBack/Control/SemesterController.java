package com.example.asemsBack.Control;

import com.example.asemsBack.Service.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/semesters")
public class SemesterController {
    @Autowired
    SemesterService semesterService;

    @PostMapping("/update-status")
    public ResponseEntity<String> updateSemesterStatus() {
        semesterService.updateSemesterStatus(); // Manually trigger the task
        return ResponseEntity.ok("Semester status update triggered successfully.");
    }
}
