package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.TeacherDto;
import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Model.Users;
import com.example.asemsBack.Repository.TeacherRepo;
import com.example.asemsBack.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private TeacherRepo teacherRepo;

    public List<TeacherDto> getAllTeachers() {
        return teacherRepo.findAllWithUserDTO();
    }

    public void registerTeacher(Users user, String qualification, String specialization, int yearsOfExperience) {
        Users savedUser = userRepository.save(user);
        Teacher teacher=new Teacher();
        teacher.setUser(savedUser);
        teacher.setQualification(qualification);
        teacher.setSpecialization(specialization);
        teacher.setYearsOfExperience(yearsOfExperience);
        teacherRepo.save(teacher);
    }

    public List<TeacherDto> searchTeachersByUsername(String username) {
        return teacherRepo.findByUserUsernameContaining(username);
    }
}
