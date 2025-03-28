package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Course;
import com.example.asemsBack.Model.CourseClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseClassRepo extends JpaRepository<CourseClass,Long> {
    List<CourseClass> findByClassesId(long classid);


    @Modifying
    @Query(value = """
        DELETE cc
        FROM course_class cc
        JOIN teacher_course tc ON cc.teacher_course_id = tc.id
        JOIN semester_teacher_course stc ON tc.id = stc.teacher_course_id
        WHERE cc.class_id = :classId
        AND tc.id = :teacherCourseId
        """, nativeQuery = true)
    void deleteCourseFromClass(@Param("classId") Long classId, @Param("teacherCourseId") Long teacherCourseId);    }

