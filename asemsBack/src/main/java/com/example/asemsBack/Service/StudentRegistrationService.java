package com.example.asemsBack.Service;

import com.example.asemsBack.Model.*;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class StudentRegistrationService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private StudRepo studentRepository;

    @Autowired
    private ClassRepo classRepo;


    @Autowired
    CourseClassRepo courseClassRepo;

    @Autowired
    EnrollRepo enrollRepo;

    @Autowired
    private SemesterRepo semesterRepo;

    @Autowired
    EnrollmentSemesterRepo enrollmentSemesterRepo;

    @Transactional
    public void registerStudent(Users user, int year, long classid) {
        Users savedUser = userRepository.save(user);

        Student student = new Student();
        student.setUser(savedUser);

        // Fetch the class entity
        Class classes = classRepo.findById(classid)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classid));

        student.setClasses(classes);
        student.setBatchYear(year);

        // Save the student
        Student savedStudent = studentRepository.save(student);

        // Auto-enroll student in all courses for the class
        List<CourseClass> courseClasses = courseClassRepo.findByClassesId(classid);
        for (CourseClass courseClass : courseClasses) {
            TeacherCourse course = courseClass.getTeacherCourse();

               Semester semester=getActiveSemester();
            EnrollementSemester enrollementSemester=new EnrollementSemester();


            Enrollement enrollment = new Enrollement();
                enrollment.setStudent(savedStudent);
                enrollment.setTeacherCourse(course);
                enrollment.setEnrollementDate(Date.valueOf(LocalDate.now())); // Store current date
                enrollementSemester.setEnrollement(enrollment);
                enrollementSemester.setSemester(semester);


            enrollRepo.save(enrollment);
            enrollmentSemesterRepo.save(enrollementSemester);

        }
    }
    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);

    }

}
