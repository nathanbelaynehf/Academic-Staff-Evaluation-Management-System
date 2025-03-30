package com.example.asemsBack.Control.RegistrarControls;

import com.example.asemsBack.Dto.DepartmentStudentCountDTO;
import com.example.asemsBack.Dto.DepartmentWithClassesDTO;
import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.DepartmentRepo;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.DepartmentService;
import com.example.asemsBack.Service.RegistrarDataService;
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
@RequestMapping("/reg")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerReg {

    @Autowired
    UserRepo userRepo;

    @Autowired
    RegistrarDataService registrarDataService;

    @Autowired
    DepartmentService departmentService;


    @GetMapping("/hierarchy")
    public ResponseEntity<List<DepartmentWithClassesDTO>> getDepartmentHierarchy() {
        return ResponseEntity.ok(departmentService.getDepartmentHierarchy());
    }

    @GetMapping("/profile")
    public RegistrarDataDto getAuthenticatedRegistrarProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getRegistrar() == null) {
            throw new RuntimeException("Registrar not found");
        }

        return registrarDataService.getRegistrarById(user.getRegistrar().getId());
    }


    @GetMapping("/student-counts")
    public ResponseEntity<List<DepartmentStudentCountDTO>> getDepartmentStudentCounts() {
        return ResponseEntity.ok(departmentService.getDepartmentStudentCounts());
    }

}