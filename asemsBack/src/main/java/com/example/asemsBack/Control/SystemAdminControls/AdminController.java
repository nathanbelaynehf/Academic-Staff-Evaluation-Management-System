package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Service.RegisterAuthoritiesService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    RegisterAuthoritiesService Rservice;

    @GetMapping("/admin")
    public String login() {
        return "redirect:http://localhost:5173/admin/";
    }

    @GetMapping("/dh")
    public String logind() {
        return "Hello Department Head";
    }

    @GetMapping("/ad")
    public String logina() {
        return "Hello Academic Dean";
    }

    @GetMapping("/reg")
    public String logins() {
        return "Hello Registrar";
    }

    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);

    @PostMapping("/admin")
    public ResponseEntity<String> register(@RequestBody Users user) {
        try {
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);
            Rservice.RegisterUser(user);
            return ResponseEntity.ok("{\"message\":\"User registered successfully\"}"); // Success response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}
