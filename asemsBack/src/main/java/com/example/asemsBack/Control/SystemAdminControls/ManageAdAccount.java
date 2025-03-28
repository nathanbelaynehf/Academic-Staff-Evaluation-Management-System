package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Dto.AcademicDeanDataDto;
import com.example.asemsBack.Dto.AcademicDeanDto;
import com.example.asemsBack.Repository.ADRepo;
import com.example.asemsBack.Service.AcademicDeanDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class ManageAdAccount {

    @Autowired
    ADRepo adRepo;

    @Autowired
    AcademicDeanDataService academicDeanDataService;

    @GetMapping("/ad")
    public List<AcademicDeanDto> getad(){
        return adRepo.findAllWithUserDTO();
    }

    @GetMapping("/ad/{id}")
    public ResponseEntity<AcademicDeanDataDto> getStudentById(@PathVariable Long id) {
        AcademicDeanDataDto academicDeanDataDto = academicDeanDataService.getAcademicDeanById(id);
        return ResponseEntity.ok(academicDeanDataDto);
    }

    @PutMapping("/ad/{id}")
    public ResponseEntity<AcademicDeanDataDto> updateStudent(@PathVariable Long id, @RequestBody AcademicDeanDataDto academicDeanDataDto) {
        AcademicDeanDataDto academicDeanDataDto1 = academicDeanDataService.updateAcademicDean(id, academicDeanDataDto);
        return ResponseEntity.ok(academicDeanDataDto1);
    }

}
