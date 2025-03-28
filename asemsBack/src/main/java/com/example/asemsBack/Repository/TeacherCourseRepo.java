package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Teacher;
import com.example.asemsBack.Model.TeacherCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherCourseRepo extends JpaRepository<TeacherCourse,Long> {
    @Query("SELECT tc FROM TeacherCourse tc " +
            "JOIN tc.courseCourses cc " + // Join CourseClass
            "JOIN cc.classes c " + // Join Classes
            "JOIN tc.semesterTeacherCourses stc " + // Join SemesterTeacherCourse
            "JOIN stc.semester s " + // Join Semester
            "WHERE c.id = :classId AND s.isActive = true")
    List<TeacherCourse> findByClassIdAndActiveSemester(@Param("classId") Long classId);


    List<TeacherCourse> findByTeacherUserUsername(String username);

    List<TeacherCourse> findByTeacher(Teacher teacher);
}