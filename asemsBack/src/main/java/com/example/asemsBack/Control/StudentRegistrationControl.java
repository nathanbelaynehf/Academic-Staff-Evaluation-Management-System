package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.UserRepo;
import com.example.asemsBack.Service.ClassService;
import com.example.asemsBack.Service.StudentRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/reg")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentRegistrationControl {

    @Autowired
    UserRepo userRepo;

    @Autowired
    StudentRegistrationService Stureg;


    @Autowired
    ClassService classService;

    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);


    @PostMapping("/student")
    public ResponseEntity<String> registerStudent(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String role,
            @RequestParam int batchYear,
            @RequestParam String dob,
            @RequestParam String sex,
            @RequestParam String dateOfReg,
            @RequestParam String Nationality,
            @RequestParam String city,
            @RequestParam String subCity,
            @RequestParam String kebele,
            @RequestParam String pnum,
            @RequestParam String email,
            @RequestParam Long classid, // Assuming class ID is a long value
            @RequestParam Boolean status) {


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
        Stureg.registerStudent(user, batchYear,classid);
        return ResponseEntity.ok("{\"message\": \"Student registered successfully!\"}");
    }
    @GetMapping("/class")
    public List<Class> showClasses(){
        return classService.showclasses();
    }

}
