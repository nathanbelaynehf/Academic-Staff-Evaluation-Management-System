package com.example.asemsBack.Control.TeacherControls;

import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Dto.TeacherDataDTO;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.TeacherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teach")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerTeach {

    @Autowired
    UserRepo userRepo;

    @Autowired
    TeacherDataService teacherDataService;

    @GetMapping("/profile")
    public TeacherDataDTO getAuthenticatedTeacherProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getTeacher() == null) {
            throw new RuntimeException("Teacher not found");
        }

        return teacherDataService.getTeacherById(user.getTeacher().getId());
    }
}