package com.example.asemsBack.Control.RegistrarControls;

import com.example.asemsBack.Dto.DHDataDto;
import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.RegistrarDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reg")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerReg {

    @Autowired
    UserRepo userRepo;

    @Autowired
    RegistrarDataService registrarDataService;

    @GetMapping("/profile")
    public RegistrarDataDto getAuthenticatedRegistrarProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = userRepo.findByUsername(authentication.getName());

        if (user == null || user.getRegistrar() == null) {
            throw new RuntimeException("Registrar not found");
        }

        return registrarDataService.getRegistrarById(user.getRegistrar().getId());
    }

}