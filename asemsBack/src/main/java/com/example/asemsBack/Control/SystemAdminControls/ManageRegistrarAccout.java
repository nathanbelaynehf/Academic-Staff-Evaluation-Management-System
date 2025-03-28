package com.example.asemsBack.Control.SystemAdminControls;

import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Dto.RegistrarDto;
import com.example.asemsBack.Repository.RegistrarRepo;
import com.example.asemsBack.Service.RegistrarDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class ManageRegistrarAccout {

    @Autowired
    RegistrarRepo registrarRepo;

    @Autowired
    RegistrarDataService registrarDataService;

    @GetMapping("/registerars")
    public List<RegistrarDto> getAllRegistrars(){
        return registrarRepo.findAllWithUserDTO();
    }

    @GetMapping("/registrar/{id}")
    public ResponseEntity<RegistrarDataDto> getStudentById(@PathVariable Long id) {
        RegistrarDataDto registrarDataDto = registrarDataService.getRegistrarById(id);
        return ResponseEntity.ok(registrarDataDto);
    }

    @PutMapping("/registrar/{id}")
    public ResponseEntity<RegistrarDataDto> updateStudent(@PathVariable Long id, @RequestBody RegistrarDataDto registrarDataDto) {
        RegistrarDataDto registrarDataDto1 = registrarDataService.updateRegistrar(id, registrarDataDto);
        return ResponseEntity.ok(registrarDataDto1);
    }

}