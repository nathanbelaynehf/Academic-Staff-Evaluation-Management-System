package com.example.asemsBack.Control.StudentControls;

import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Dto.StudentDataDTO;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.StudentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stud")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerStud {
    @Autowired
    UserRepo userRepo;

    @Autowired
    StudentDataService studentDataService;

    @GetMapping("/profile")
    public StudentDataDTO getAuthenticatedStudentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getStudent() == null) {
            throw new RuntimeException("Student not found");
        }

        return studentDataService.getStudentById(user.getStudent().getId());
    }

}