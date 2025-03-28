package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepo extends JpaRepository<Report,Long> {
    @Query("SELECT r FROM Report r WHERE r.teacherCourse.id = :teacherCourseId AND r.submissionDate >= :oneWeekAgo")
    List<Report> findByTeacherCourseIdAndSubmissionDateWithinLastWeek(
            @Param("teacherCourseId") Long teacherCourseId,
            @Param("oneWeekAgo") LocalDateTime oneWeekAgo
    );
}
