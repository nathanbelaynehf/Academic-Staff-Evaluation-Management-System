package com.example.asemsBack.Control.RegistrarControls;

import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/reg")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherRegistrationController {

    @Autowired
    TeacherService teacherService;

    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);

    @PostMapping("/teacher")
    public ResponseEntity<String> registerStudent(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String role,
            @RequestParam String dob,
            @RequestParam String sex,
            @RequestParam String dateOfReg,
            @RequestParam String Nationality,
            @RequestParam String city,
            @RequestParam String subCity,
            @RequestParam String kebele,
            @RequestParam String pnum,
            @RequestParam String email,
            @RequestParam Boolean status,
            @RequestParam String qualification,
            @RequestParam String specialization,
            @RequestParam int yearsOfExperience,
            @RequestParam String fname,
            @RequestParam String lname,
            @RequestParam String gname
    ) {
        String encodedPassword = passwordEncoder.encode(password);

        Users user = new Users();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(role);
        user.setRegistrar(null);
        user.setDob(Date.valueOf(dob));
        user.setSex(sex);
        user.setDateOfReg(Date.valueOf(dateOfReg));
        user.setNationality(Nationality);
        user.setCity(city);
        user.setSubCity(subCity);
        user.setKebele(kebele);
        user.setPnum(Integer.parseInt(pnum));
        user.setEmail(email);
        user.setStatus(status);
        user.setFname(fname);
        user.setLname(lname);
        user.setGname(gname);
        teacherService.registerTeacher(user,qualification,specialization,yearsOfExperience);

        return ResponseEntity.ok("{\"message\": \"Teacher registered successfully!\"}");
    }


    }
