package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Dto.DHDataDto;
import com.example.asemsBack.Dto.DepartmentHeadDto;
import com.example.asemsBack.Repository.DeptHeadRepo;
import com.example.asemsBack.Service.DHDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class ManageDHAccount {

    @Autowired
    DeptHeadRepo deptHeadRepo;

    @Autowired
    DHDataService dhDataService;

    @GetMapping("/dh")
    public List<DepartmentHeadDto> getAllDH(){
        return deptHeadRepo.findAllWithUserAndDepartmentDTO();
    }

    @GetMapping("/dh/{id}")
    public ResponseEntity<DHDataDto> getStudentById(@PathVariable Long id) {
        DHDataDto dhDataDto = dhDataService.getDepartmentHeadById(id);
        return ResponseEntity.ok(dhDataDto);
    }

    @PutMapping("/dh/{id}")
    public ResponseEntity<DHDataDto> updateStudent(@PathVariable Long id, @RequestBody DHDataDto dhDataDto) {
        DHDataDto updatedDh = dhDataService.updateDepartmentHead(id, dhDataDto);
        return ResponseEntity.ok(updatedDh);
    }

    @GetMapping("/dh/search")
    public ResponseEntity<List<DepartmentHeadDto>> searchStudentsByUsername(@RequestParam String username) {
        List<DepartmentHeadDto> dh = deptHeadRepo.findByUserUsernameContaining(username);
        return ResponseEntity.ok(dh);
    }
}