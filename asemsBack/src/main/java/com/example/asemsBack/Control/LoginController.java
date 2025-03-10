package com.example.asemsBack.Control;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {
    @GetMapping("/")
    public String login() {
        return "redirect:http://localhost:5173"; // Redirect to your React app's root URL
    }


}
