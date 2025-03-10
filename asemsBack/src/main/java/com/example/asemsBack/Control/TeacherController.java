package com.example.asemsBack.Control;

import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dh")
@CrossOrigin(origins = "http://localhost:5173")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping("/teacher")
    public List<Teacher> getInstructor(){
        List<Teacher> TeachersList=teacherService.getAllTeachers();
        return TeachersList;
    }

}