package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.RegistrarDataDto;
import com.example.asemsBack.Model.Registrar;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.RegistrarRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrarDataService {

    @Autowired
    RegistrarRepo registrarRepo;

    @Autowired
    UserRepo userRepo;

    public RegistrarDataDto getRegistrarById(Long id) {

        Registrar registrar = registrarRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Registrar Head not found"));

        Users user = registrar.getUser();

        RegistrarDataDto registrarDataDto = new RegistrarDataDto();


        registrarDataDto.setId(registrar.getId());
        registrarDataDto.setFname(user.getFname());
        registrarDataDto.setLname(user.getLname());
        registrarDataDto.setGname(user.getGname());
        registrarDataDto.setUsername(user.getUsername());
        registrarDataDto.setRole(user.getRole());
        registrarDataDto.setDob(user.getDob());
        registrarDataDto.setSex(user.getSex());
        registrarDataDto.setStatus(user.isStatus());
        registrarDataDto.setDateOfReg(user.getDateOfReg());
        registrarDataDto.setNationality(user.getNationality());
        registrarDataDto.setCity(user.getCity());
        registrarDataDto.setSubCity(user.getSubCity());
        registrarDataDto.setKebele(user.getKebele());
        registrarDataDto.setPnum(user.getPnum());
        registrarDataDto.setEmail(user.getEmail());
        registrarDataDto.setQualification(registrar.getQualification());
        registrarDataDto.setYearsOfExperience(registrar.getYearsOfExperience());


        return registrarDataDto;
    }

    public RegistrarDataDto updateRegistrar(Long id, RegistrarDataDto registrarDto) {
        // Fetching the Registrar by ID
        Registrar registrar = registrarRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Registrar not found"));

        Users user = registrar.getUser();

        // Updating user details from registrarDto
        registrar.setId(registrarDto.getId());
        user.setFname(registrarDto.getFname());
        user.setLname(registrarDto.getLname());
        user.setGname(registrarDto.getGname());
        user.setUsername(registrarDto.getUsername());
        user.setRole(registrarDto.getRole());
        user.setDob(registrarDto.getDob());
        user.setSex(registrarDto.getSex());
        user.setStatus(registrarDto.isStatus());
        user.setDateOfReg(registrarDto.getDateOfReg());
        user.setNationality(registrarDto.getNationality());
        user.setCity(registrarDto.getCity());
        user.setSubCity(registrarDto.getSubCity());
        user.setKebele(registrarDto.getKebele());
        user.setPnum(registrarDto.getPnum());
        user.setEmail(registrarDto.getEmail());
        registrar.setYearsOfExperience(registrarDto.getYearsOfExperience());
        registrar.setQualification(registrarDto.getQualification());

        // Return updated DTO (this assumes the update logic also includes the updated user data)
        return registrarDto;
    }



}