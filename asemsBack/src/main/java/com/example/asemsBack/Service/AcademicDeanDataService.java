package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.AcademicDeanDataDto;
import com.example.asemsBack.Model.AcademicDean;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.ADRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AcademicDeanDataService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    ADRepo adRepo;

    public AcademicDeanDataDto getAcademicDeanById(Long id) {

        AcademicDean academicDean = adRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic Dean not found"));

        Users user = academicDean.getUser();

        AcademicDeanDataDto academicDeanDTO = new AcademicDeanDataDto();


        academicDeanDTO.setId(academicDean.getId());
        academicDeanDTO.setFname(user.getFname());
        academicDeanDTO.setLname(user.getLname());
        academicDeanDTO.setGname(user.getGname());
        academicDeanDTO.setUsername(user.getUsername());
        academicDeanDTO.setRole(user.getRole());
        academicDeanDTO.setDob(user.getDob());
        academicDeanDTO.setSex(user.getSex());
        academicDeanDTO.setStatus(user.isStatus());
        academicDeanDTO.setDateOfReg(user.getDateOfReg());
        academicDeanDTO.setNationality(user.getNationality());
        academicDeanDTO.setCity(user.getCity());
        academicDeanDTO.setSubCity(user.getSubCity());
        academicDeanDTO.setKebele(user.getKebele());
        academicDeanDTO.setPnum(user.getPnum());
        academicDeanDTO.setEmail(user.getEmail());
        academicDeanDTO.setHighestDegree(academicDean.getHighestDegree());
        academicDeanDTO.setAcademicRank(academicDean.getAcademicRank());

        return academicDeanDTO;
    }

    public AcademicDeanDataDto updateAcademicDean(Long id, AcademicDeanDataDto academicDeanDto) {
        AcademicDean academicDean = adRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic Dean not found"));

        Users user = academicDean.getUser();

        // Updating user details from academicDeanDto
        academicDean.setId(academicDeanDto.getId());
        user.setFname(academicDeanDto.getFname());
        user.setLname(academicDeanDto.getLname());
        user.setGname(academicDeanDto.getGname());
        user.setUsername(academicDeanDto.getUsername());
        user.setRole(academicDeanDto.getRole());
        user.setDob(academicDeanDto.getDob());
        user.setSex(academicDeanDto.getSex());
        user.setStatus(academicDeanDto.isStatus());
        user.setDateOfReg(academicDeanDto.getDateOfReg());
        user.setNationality(academicDeanDto.getNationality());
        user.setCity(academicDeanDto.getCity());
        user.setSubCity(academicDeanDto.getSubCity());
        user.setKebele(academicDeanDto.getKebele());
        user.setPnum(academicDeanDto.getPnum());
        user.setEmail(academicDeanDto.getEmail());
        academicDean.setAcademicRank(academicDean.getAcademicRank());
        academicDean.setHighestDegree(academicDean.getHighestDegree());

        userRepo.save(user);
        adRepo.save(academicDean);

        return academicDeanDto;
    }


}
