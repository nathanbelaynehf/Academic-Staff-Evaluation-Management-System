package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.StudentDTO;
import com.example.asemsBack.Dto.StudentDataDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class StudentDataService {

    @Autowired
    StudRepo studRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ClassRepo classRepo;

    @Autowired
    CourseClassRepo courseClassRepo;

    @Autowired
    EnrollRepo enrollRepo;

    @Autowired
    private SemesterRepo semesterRepo;

    @Autowired
    EnrollmentSemesterRepo enrollmentSemesterRepo;

    public StudentDataDTO getStudentById(Long id) {

        Student student=studRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Student not found"));

        Users user=student.getUser();

        Class classes=student.getClasses();

        StudentDataDTO studentDTO= new StudentDataDTO();

        studentDTO.setId(student.getId());
        studentDTO.setBatchYear(student.getBatchYear());
        studentDTO.setFname(user.getFname());
        studentDTO.setLname(user.getLname());
        studentDTO.setGname(user.getGname());
        studentDTO.setUsername(user.getUsername());
        studentDTO.setRole(user.getRole());
        studentDTO.setDob(user.getDob());
        studentDTO.setSex(user.getSex());
        studentDTO.setStatus(user.isStatus());
        studentDTO.setDateOfReg(user.getDateOfReg());
        studentDTO.setNationality(user.getNationality());
        studentDTO.setCity(user.getCity());
        studentDTO.setSubCity(user.getSubCity());
        studentDTO.setKebele(user.getKebele());
        studentDTO.setPnum(user.getPnum());
        studentDTO.setEmail(user.getEmail());
        studentDTO.setClassid(classes.getId());
        studentDTO.setClassName(classes.getClassName());

        return studentDTO;
    }
    public StudentDataDTO updateStudent(Long id, StudentDataDTO studentDto) {
        Student student = studRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Users user = student.getUser();

        // Updating user details from studentDto
        student.setId(studentDto.getId());
        student.setBatchYear(studentDto.getBatchYear());
        user.setFname(studentDto.getFname());
        user.setLname(studentDto.getLname());
        user.setGname(studentDto.getGname());
        user.setUsername(studentDto.getUsername());
        user.setRole(studentDto.getRole());
        user.setDob(studentDto.getDob());
        user.setSex(studentDto.getSex());
        user.setStatus(studentDto.isStatus());
        user.setDateOfReg(studentDto.getDateOfReg());
        user.setNationality(studentDto.getNationality());
        user.setCity(studentDto.getCity());
        user.setSubCity(studentDto.getSubCity());
        user.setKebele(studentDto.getKebele());
        user.setPnum(studentDto.getPnum());
        user.setEmail(studentDto.getEmail());
        Class classes=classRepo.findById(studentDto.getClassid())
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + studentDto.getClassid()));;
        student.setClasses(classes);
        List<CourseClass> courseClasses = courseClassRepo.findByClassesId(studentDto.getClassid());
        for (CourseClass courseClass : courseClasses) {
            TeacherCourse course = courseClass.getTeacherCourse();

            Semester semester=getActiveSemester();
            EnrollementSemester enrollementSemester=new EnrollementSemester();


            Enrollement enrollment = new Enrollement();
            enrollment.setStudent(student);
            enrollment.setTeacherCourse(course);
            enrollment.setEnrollementDate(Date.valueOf(LocalDate.now())); // Store current date
            enrollementSemester.setEnrollement(enrollment);
            enrollementSemester.setSemester(semester);


            enrollRepo.save(enrollment);
            enrollmentSemesterRepo.save(enrollementSemester);

        }

        userRepo.save(user);
        studRepo.save(student);

        return getStudentById(id); // Returning updated student data
    }

    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);

    }

    public List<StudentDTO> searchStudentsByUsername(String username) {
        return studRepo.findByUserUsernameContaining(username);
    }
}