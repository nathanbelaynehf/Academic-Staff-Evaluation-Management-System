package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Service.ShowDepartmentResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teach")
@CrossOrigin(origins = "http://localhost:5173")
public class Teachshowdeptres {
    @Autowired
    private ShowDepartmentResultService showDepartmentResultService;

    @GetMapping("/dept")
    public ResponseEntity<?> getDepartmentEvaluationsForAuthenticatedTeacher() {
        return showDepartmentResultService.getDepartmentEvaluationsForAuthenticatedTeacher();
    }
}