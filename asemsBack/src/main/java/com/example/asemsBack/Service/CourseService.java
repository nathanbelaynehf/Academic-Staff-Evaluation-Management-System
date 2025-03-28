package com.example.asemsBack.Service;

import com.example.asemsBack.Model.Course;
import com.example.asemsBack.Model.DepartmentCourse;
import com.example.asemsBack.Repository.CourseRepo;
import com.example.asemsBack.Repository.DeptCourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private DeptCourseRepo deptCourseRepo;

    public void saveDepartmentCourse(DepartmentCourse departmentCourse) {
        deptCourseRepo.save(departmentCourse);  // Assuming you have a repository for DepartmentCourse
    }



    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public Course SaveCourses(Course course) {
        return courseRepo.save(course);
    }
    public List<Course> getCoursesByDepartmentId(long departmentId) {
        // Assuming you have a repository for DepartmentCourse
        List<DepartmentCourse> departmentCourses = deptCourseRepo.findByDepartmentId(departmentId);

        // Extract and return the list of courses from DepartmentCourse entities
        return departmentCourses.stream()
                .map(DepartmentCourse::getCourse)
                .collect(Collectors.toList());
    }
    public Course getCourseById(Long id) {
        Optional<Course> course = courseRepo.findById(id);
        return course.orElse(null);
    }

    public void deleteCourse(Long id) {
        // First delete all department-course associations
        DepartmentCourse departmentCourses = deptCourseRepo.findByCourseId(id);
        deptCourseRepo.delete(departmentCourses);
        // Then delete the course itself
        courseRepo.deleteById(id);
    }

}
