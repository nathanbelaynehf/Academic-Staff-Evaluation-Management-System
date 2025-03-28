package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.TeacherDataDTO;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.TeacherRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherDataService {

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    UserRepo userRepo;

    public TeacherDataDTO getTeacherById(Long id) {

        Teacher teacher = teacherRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Users user = teacher.getUser();


        TeacherDataDTO teacherDTO = new TeacherDataDTO();

        teacherDTO.setId(teacher.getId());
        teacherDTO.setFname(user.getFname());
        teacherDTO.setLname(user.getLname());
        teacherDTO.setGname(user.getGname());
        teacherDTO.setUsername(user.getUsername());
        teacherDTO.setRole(user.getRole());
        teacherDTO.setDob(user.getDob());
        teacherDTO.setSex(user.getSex());
        teacherDTO.setStatus(user.isStatus());
        teacherDTO.setDateOfReg(user.getDateOfReg());
        teacherDTO.setNationality(user.getNationality());
        teacherDTO.setCity(user.getCity());
        teacherDTO.setSubCity(user.getSubCity());
        teacherDTO.setKebele(user.getKebele());
        teacherDTO.setPnum(user.getPnum());
        teacherDTO.setEmail(user.getEmail());
        teacherDTO.setQualification(teacher.getQualification());
        teacherDTO.setSpecialization(teacher.getSpecialization());
        teacherDTO.setYearsOfExperience(teacher.getYearsOfExperience());

        return teacherDTO;
    }

    public TeacherDataDTO updateTeacher(Long id, TeacherDataDTO teacherDto) {
        Teacher teacher = teacherRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Users user = teacher.getUser();

        // Updating user details from teacherDto
        teacher.setId(teacherDto.getId());
        user.setFname(teacherDto.getFname());
        user.setLname(teacherDto.getLname());
        user.setGname(teacherDto.getGname());
        user.setUsername(teacherDto.getUsername());
        user.setRole(teacherDto.getRole());
        user.setDob(teacherDto.getDob());
        user.setSex(teacherDto.getSex());
        user.setStatus(teacherDto.isStatus());
        user.setDateOfReg(teacherDto.getDateOfReg());
        user.setNationality(teacherDto.getNationality());
        user.setCity(teacherDto.getCity());
        user.setSubCity(teacherDto.getSubCity());
        user.setKebele(teacherDto.getKebele());
        user.setPnum(teacherDto.getPnum());
        user.setEmail(teacherDto.getEmail());
        teacher.setYearsOfExperience(teacher.getYearsOfExperience());
        teacher.setSpecialization(teacher.getSpecialization());
        teacher.setQualification(teacherDto.getQualification());
        // Save updated teacher and return updated DTO
        userRepo.save(user);
        teacherRepo.save(teacher);

        return teacherDto;
    }




}