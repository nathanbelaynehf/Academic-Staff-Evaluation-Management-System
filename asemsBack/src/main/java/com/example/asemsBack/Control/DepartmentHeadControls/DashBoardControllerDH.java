package com.example.asemsBack.Control.DepartmentHeadControls;

import com.example.asemsBack.Dto.ClassStatisticsDTO;
import com.example.asemsBack.Dto.DHDataDto;
import com.example.asemsBack.Dto.TotalEvaluationStatsDTO;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.ClassStatisticsService;
import com.example.asemsBack.Service.DHDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerDH {

    @Autowired
    UserRepo userRepo;

    @Autowired
    DHDataService dhDataService;

    @Autowired
    ClassStatisticsService classStatisticsService;

    @GetMapping("/profile")
    public DHDataDto getAuthenticatedDepartmentHeadProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getDepartmentHead() == null) {
            throw new RuntimeException("Department Head not found");
        }

        return dhDataService.getDepartmentHeadById(user.getDepartmentHead().getId());
    }


    @GetMapping("/stats/evaluations")
    public ResponseEntity<List<ClassStatisticsDTO>> getClassEvaluationStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        return ResponseEntity.ok(classStatisticsService.getClassEvaluationStat(user.getDepartmentHead().getDepartment().getId()));
    }

    @GetMapping("/stats/totals")
    public ResponseEntity<TotalEvaluationStatsDTO> getTotalEvaluationStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());
        return ResponseEntity.ok(classStatisticsService.getDepartmentEvaluationStats(user.getDepartmentHead().getDepartment().getId()));
    }


}