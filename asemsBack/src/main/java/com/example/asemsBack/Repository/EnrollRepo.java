package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Enrollement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollRepo extends JpaRepository<Enrollement,Long> {

    @Query("SELECT e FROM Enrollement e " +
            "JOIN e.enrollementSemesters es " + // Join EnrollementSemester
            "JOIN es.semester s " + // Join Semester
            "WHERE e.student.id = :studentId AND s.isActive = true")
    List<Enrollement> findByStudentIdAndActiveSemester(@Param("studentId") long studentId);
    Enrollement findByStudent_IdAndTeacherCourse_Id(Long studentId, Long teacherCourseId);}
