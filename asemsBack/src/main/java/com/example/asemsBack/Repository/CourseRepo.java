package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepo extends JpaRepository<Course,Long> {
    @Query("SELECT c FROM TeacherCourse c JOIN c.courseCourses cc WHERE cc.classes.id = :classId")
    List<Course> findByClassId(@Param("classId") Long classId);
}
