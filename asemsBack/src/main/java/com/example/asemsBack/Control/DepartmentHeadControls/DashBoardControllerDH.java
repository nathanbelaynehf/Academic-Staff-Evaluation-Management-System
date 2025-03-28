package com.example.asemsBack.Control.DepartmentHeadControls;

import com.example.asemsBack.Dto.DHDataDto;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.DHDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerDH {

    @Autowired
    UserRepo userRepo;

    @Autowired
    DHDataService dhDataService;

    @GetMapping("/profile")
    public DHDataDto getAuthenticatedDepartmentHeadProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getDepartmentHead() == null) {
            throw new RuntimeException("Department Head not found");
        }

        return dhDataService.getDepartmentHeadById(user.getDepartmentHead().getId());
    }

}