package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Service.RegistrarRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrarRegistrationController {

    @Autowired
    RegistrarRegistrationService registrarRegistrationService;

    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder(10);

    @PostMapping("/reg")
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
            @RequestParam int yearsOfExperience,
            @RequestParam String fname,
            @RequestParam String lname,
            @RequestParam String gname
    ){
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
        registrarRegistrationService.registerRegistrar(user,qualification,yearsOfExperience);
        return ResponseEntity.ok("{\"message\": \"Teacher registered successfully!\"}");
    }

}
