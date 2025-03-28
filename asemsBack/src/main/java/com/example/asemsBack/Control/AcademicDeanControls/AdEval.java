package com.example.asemsBack.Control.AcademicDeanControls;

import com.example.asemsBack.Model.AcademicDean;
import com.example.asemsBack.Model.Evaluation;
import com.example.asemsBack.Service.AcademicDeanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ad")
@CrossOrigin(origins = "http://localhost:5173")
public class AdEval {

    @Autowired
    AcademicDeanService academicDeanService;

    @PostMapping("/evalsubmit")
    public Evaluation submitEvaluations(@RequestBody Map<String, Object> request) throws Exception {
        // Get the authenticated academic dean
        String username = getAuthenticatedUsername();
        AcademicDean academicDean = academicDeanService.getAcademicDeanByUsername(username);
        return academicDeanService.saveEvaluations(username,request);
    }

    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
