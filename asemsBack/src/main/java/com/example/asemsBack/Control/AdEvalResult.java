package com.example.asemsBack.Control;

import com.example.asemsBack.Model.AcademicDeanEval;
import com.example.asemsBack.Service.AcademicDeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class AdEvalResult {
    @Autowired
    private AcademicDeanService academicDeanEvalService;

    @GetMapping("/adeval/{teacherId}")
    public ResponseEntity<List<AcademicDeanEvalDTO>> getAcademicDeanEvaluationsByTeacherId(@PathVariable Long teacherId) {
        List<AcademicDeanEvalDTO> evaluations = academicDeanEvalService.getAcademicDeanEvaluationsByTeacherId(teacherId);
        return ResponseEntity.ok(evaluations);
    }
}
