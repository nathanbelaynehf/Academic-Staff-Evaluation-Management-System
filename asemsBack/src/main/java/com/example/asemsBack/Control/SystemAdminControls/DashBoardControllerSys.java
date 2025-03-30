package com.example.asemsBack.Control.SystemAdminControls;


import com.example.asemsBack.Dto.SystemAdminDto;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.SystemAdminDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class DashBoardControllerSys {

    @Autowired
    UserRepo usersRepository;

    @Autowired
    SystemAdminDataService systemAdminDataService;

    @GetMapping("/profile")
    public SystemAdminDto getAuthenticatedAcademicDeanProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = usersRepository.findByUsername(authentication.getName());

        if (user == null || user.getSystemAdmin() == null) {
            throw new RuntimeException("Academic Dean not found");
        }

        return systemAdminDataService.getSystemAdminById(user.getSystemAdmin().getId());
    }
}
