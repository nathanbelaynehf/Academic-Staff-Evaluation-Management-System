package com.example.asemsBack.Control.RegistrarControls;

import com.example.asemsBack.Dto.TeacherDataDTO;
import com.example.asemsBack.Dto.TeacherDto;
import com.example.asemsBack.Service.TeacherDataService;
import com.example.asemsBack.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reg")
@CrossOrigin(origins = "http://localhost:5173")
public class RegManageTeachAccount {
    @Autowired
    private TeacherService teacherService;

    @Autowired
    TeacherDataService teacherDataService;

    @GetMapping("/teacher")
    public List<TeacherDto> getInstructor() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<TeacherDataDTO> getStudentById(@PathVariable Long id) {
        TeacherDataDTO teacherDataDTO = teacherDataService.getTeacherById(id);
        return ResponseEntity.ok(teacherDataDTO);
    }

    @PutMapping("/teacher/{id}")
    public ResponseEntity<TeacherDataDTO> updateStudent(@PathVariable Long id, @RequestBody TeacherDataDTO teacherDataDTO) {
        TeacherDataDTO updatedTeacher = teacherDataService.updateTeacher(id, teacherDataDTO);
        return ResponseEntity.ok(updatedTeacher);
    }

    @GetMapping("/teacher/search")
    public ResponseEntity<List<TeacherDto>> searchStudentsByUsername(@RequestParam String username) {
        List<TeacherDto> teacher = teacherService.searchTeachersByUsername(username);
        return ResponseEntity.ok(teacher);
    }

}
