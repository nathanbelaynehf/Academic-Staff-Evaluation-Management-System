package com.example.asemsBack.Service;

import com.example.asemsBack.Model.*;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TeacherCourseServices {

    @Autowired
    ClassRepo classRepo;

    @Autowired
    TeacherCourseRepo teacherCourseRepo;

    @Autowired
    private TeacherRepo teacherRepository;

    @Autowired
    private CourseRepo courseRepository;

    @Autowired
    private CourseClassRepo courseClassRepo;

    @Autowired
    private SemesTeachCourseRepo semesTeachCourseRepo;

    @Autowired
    private SemesterRepo semesterRepo;

    @Transactional
    public void assignTeacherToCourse(Long teacherId, Long courseId, Long classId) {
        // Fetch and validate the teacher, course, and class entities
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        Class classEntity = classRepo.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class not found with ID: " + classId));

        System.out.println("Assigning teacher " + teacherId + " to course " + courseId + " in class " + classId);

        // Create and save the TeacherCourse entity
        TeacherCourse teacherCourse = new TeacherCourse();
        teacherCourse.setTeacher(teacher);
        teacherCourse.setCourse(course);
        teacherCourse = teacherCourseRepo.save(teacherCourse);  // Save and get the persisted entity

        SemesterTeacherCourse semesterTeacherCourse=new SemesterTeacherCourse();
        Semester semester=getActiveSemester();
        semesterTeacherCourse.setTeacherCourse(teacherCourse);
        semesterTeacherCourse.setSemester(semester);
        semesterTeacherCourse=semesTeachCourseRepo.save(semesterTeacherCourse);

        // Create and save the CourseClass entity
        CourseClass courseClass = new CourseClass();
        courseClass.setClasses(classEntity);
        courseClass.setTeacherCourse(teacherCourse);  // Associate the saved TeacherCourse
        courseClassRepo.save(courseClass);

        System.out.println("Teacher assigned successfully!");
    }
    public Semester getActiveSemester() {
        return semesterRepo.findByIsActive(true);

    }
}
