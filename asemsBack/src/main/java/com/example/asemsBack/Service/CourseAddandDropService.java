package com.example.asemsBack.Service;

import com.example.asemsBack.Control.TeacherCourseDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseAddandDropService {

    @Autowired
    TeacherCourseRepo teacherCourseRepo;

    @Autowired
    StudRepo studRepo;

    @Autowired
    EnrollRepo enrollRepo;

    @Autowired
    private SemesterRepo semesterRepo;

    @Autowired
    EnrollmentSemesterRepo enrollmentSemesterRepo;

    public List<TeacherCourseDTO> getAllCourses() {
        List<TeacherCourse> teacherCourses = teacherCourseRepo.findAll();
        System.out.println("Total TeacherCourses found: " + teacherCourses.size());

        return teacherCourses.stream()
                .map(teacherCourse -> {
                    // Check if teacher or course is null
                    if (teacherCourse.getTeacher() == null) {
                        System.out.println("Teacher is NULL for TeacherCourse ID: " + teacherCourse.getId());
                    } else if (teacherCourse.getTeacher().getUser() == null) {
                        System.out.println("User is NULL for Teacher ID: " + teacherCourse.getTeacher().getId());
                    } else {
                        System.out.println("Teacher Username: " + teacherCourse.getTeacher().getUser().getUsername());
                    }

                    if (teacherCourse.getCourse() == null) {
                        System.out.println("Course is NULL for TeacherCourse ID: " + teacherCourse.getId());
                    } else {
                        System.out.println("Course Name: " + teacherCourse.getCourse().getCourseName());
                    }

                    String username = (teacherCourse.getTeacher() != null && teacherCourse.getTeacher().getUser() != null)
                            ? teacherCourse.getTeacher().getUser().getUsername()
                            : "Unknown Teacher";

                    String courseName = (teacherCourse.getCourse() != null)
                            ? teacherCourse.getCourse().getCourseName()
                            : "Unknown Course";

                    Long teacherCouseId=(teacherCourse.getId());

                    return new TeacherCourseDTO(username, courseName,teacherCouseId);
                })
                .collect(Collectors.toList());
    }

    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);

    }
    public void addCourse(Long studentId, Long courseId) {
        Student student = studRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        TeacherCourse course = teacherCourseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Semester semester=getActiveSemester();

        EnrollementSemester enrollementSemester=new EnrollementSemester();

        Enrollement enrollement = new Enrollement();
        enrollement.setStudent(student);
        enrollement.setTeacherCourse(course);


        enrollement.setEnrollementDate(java.sql.Date.valueOf(LocalDate.now()));
        enrollementSemester.setEnrollement(enrollement);
        enrollementSemester.setSemester(semester);
        enrollRepo.save(enrollement);
        enrollmentSemesterRepo.save(enrollementSemester);

    }

    public void dropCourse(Long studentId, Long courseId) {

        Enrollement enrollement =  enrollRepo.findByStudent_IdAndTeacherCourse_Id(studentId, courseId);
        EnrollementSemester enrollementSemester=enrollmentSemesterRepo.findByEnrollement(enrollement);
        enrollmentSemesterRepo.delete(enrollementSemester);
        enrollRepo.delete(enrollement);
    }
    }

