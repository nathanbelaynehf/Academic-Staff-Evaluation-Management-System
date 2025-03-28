package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.EnrollementDTO;
import com.example.asemsBack.Model.Enrollement;
import com.example.asemsBack.Repository.EnrollRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {
    @Autowired
    EnrollRepo enrollRepo;

    public List<EnrollementDTO> getEnrollmentsByStudentId(Long studentId) {
        List<Enrollement> enrollments = enrollRepo.findByStudentIdAndActiveSemester(studentId);

        return enrollments.stream().map(enrollment -> new EnrollementDTO(
                enrollment.getTeacherCourse().getCourse().getCourseName(),
                enrollment.getTeacherCourse().getTeacher().getUser().getUsername(),
                enrollment.getTeacherCourse().getId()
        )).collect(Collectors.toList());
    }
}
