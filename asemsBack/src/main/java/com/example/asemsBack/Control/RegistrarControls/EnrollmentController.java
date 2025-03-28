package com.example.asemsBack.Control.RegistrarControls;

import com.example.asemsBack.Dto.EnrollementDTO;
import com.example.asemsBack.Service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reg")
public class EnrollmentController {

    @Autowired
    EnrollmentService enrollmentService;

    @GetMapping("/course/{studentId}")
    public List<EnrollementDTO> getEnrollmentsByStudent(@PathVariable Long studentId) {
        return enrollmentService.getEnrollmentsByStudentId(studentId);
    }
}