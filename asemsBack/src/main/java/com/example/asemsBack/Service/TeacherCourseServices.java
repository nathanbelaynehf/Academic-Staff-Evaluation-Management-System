package com.example.asemsBack.Service;

import com.example.asemsBack.Dto.DeleteCourseDto;
import com.example.asemsBack.Dto.TeacherCourseDTO;
import com.example.asemsBack.Model.*;
import com.example.asemsBack.Model.Class;
import com.example.asemsBack.Repository.*;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<TeacherCourseDTO> getCoursesForInstructor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Fetch courses taught by the instructor
        List<TeacherCourse> teacherCourses = teacherCourseRepo.findByTeacherUserUsername(username);

        // Convert entities to DTOs
        return teacherCourses.stream()
                .map(course -> new TeacherCourseDTO(
                        course.getTeacher().getUser().getUsername(),
                        course.getCourse().getCourseName(),
                        course.getId()
                ))
                .collect(Collectors.toList());
    }
    @Transactional
    public void deleteCourseFromClass(DeleteCourseDto deleteCourseDto) {
        Long classId = deleteCourseDto.getClassId();
        Long courseId = deleteCourseDto.getCourseId();

        try {
            // Perform the deletion using the custom query
            courseClassRepo.deleteCourseFromClass(classId, courseId);

            System.out.println("Course and related records deleted successfully!");
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error deleting course from class: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error deleting course from class: " + e.getMessage(), e);
        }
    }
}
