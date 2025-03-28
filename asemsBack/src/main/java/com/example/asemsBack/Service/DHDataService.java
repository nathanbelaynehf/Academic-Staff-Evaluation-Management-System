package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.DHDataDto;
import com.example.asemsBack.Model.Department;
import com.example.asemsBack.Model.DepartmentHead;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.DepartmentRepo;
import com.example.asemsBack.Repository.DeptHeadRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DHDataService {

    @Autowired
    DeptHeadRepo deptHeadRepo;

    @Autowired
    DepartmentRepo departmentRepo;

    @Autowired
    UserRepo userRepo;

    public DHDataDto getDepartmentHeadById(Long id) {

        DepartmentHead departmentHead = deptHeadRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Department Head not found"));

        Users user = departmentHead.getUser();

        DHDataDto departmentHeadDTO = new DHDataDto();

        Department department=departmentHead.getDepartment();

        departmentHeadDTO.setId(departmentHead.getId());
        departmentHeadDTO.setFname(user.getFname());
        departmentHeadDTO.setLname(user.getLname());
        departmentHeadDTO.setGname(user.getGname());
        departmentHeadDTO.setUsername(user.getUsername());
        departmentHeadDTO.setRole(user.getRole());
        departmentHeadDTO.setDob(user.getDob());
        departmentHeadDTO.setSex(user.getSex());
        departmentHeadDTO.setStatus(user.isStatus());
        departmentHeadDTO.setDateOfReg(user.getDateOfReg());
        departmentHeadDTO.setNationality(user.getNationality());
        departmentHeadDTO.setCity(user.getCity());
        departmentHeadDTO.setSubCity(user.getSubCity());
        departmentHeadDTO.setKebele(user.getKebele());
        departmentHeadDTO.setPnum(user.getPnum());
        departmentHeadDTO.setEmail(user.getEmail());
        departmentHeadDTO.setQualification(departmentHead.getQualification());
        departmentHeadDTO.setSpecialization(departmentHead.getSpecialization());
        departmentHeadDTO.setYearsOfExperience(departmentHead.getYearsOfExperience());
        departmentHeadDTO.setDhId(departmentHead.getDepartment().getId());
        departmentHeadDTO.setDhName(department.getDepartmentName());

        return departmentHeadDTO;
    }

    public DHDataDto updateDepartmentHead(Long id, DHDataDto departmentHeadDto) {
        DepartmentHead departmentHead = deptHeadRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Department Head not found"));

        Users user = departmentHead.getUser();

        // Updating user details from departmentHeadDto
        departmentHead.setId(departmentHeadDto.getId());
        user.setFname(departmentHeadDto.getFname());
        user.setLname(departmentHeadDto.getLname());
        user.setGname(departmentHeadDto.getGname());
        user.setUsername(departmentHeadDto.getUsername());
        user.setRole(departmentHeadDto.getRole());
        user.setDob(departmentHeadDto.getDob());
        user.setSex(departmentHeadDto.getSex());
        user.setStatus(departmentHeadDto.isStatus());
        user.setDateOfReg(departmentHeadDto.getDateOfReg());
        user.setNationality(departmentHeadDto.getNationality());
        user.setCity(departmentHeadDto.getCity());
        user.setSubCity(departmentHeadDto.getSubCity());
        user.setKebele(departmentHeadDto.getKebele());
        user.setPnum(departmentHeadDto.getPnum());
        user.setEmail(departmentHeadDto.getEmail());
        departmentHead.setYearsOfExperience(departmentHeadDto.getYearsOfExperience());
        departmentHead.setSpecialization(departmentHeadDto.getSpecialization());
        departmentHead.setQualification(departmentHeadDto.getQualification());
        Department department=departmentRepo.findById(departmentHeadDto.getDhId())
                .orElseThrow(() -> new RuntimeException("Department not found"+departmentHeadDto.getDhId()));

        // Save updated department head and return updated DTO
        departmentHead.setDepartment(department);
        userRepo.save(user);
        deptHeadRepo.save(departmentHead);

        return departmentHeadDto;
    }



}