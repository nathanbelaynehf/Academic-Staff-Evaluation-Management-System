package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.CourseReportAverageDTO;
import com.example.asemsBack.Model.ReportEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportEvaluationRepo extends JpaRepository<ReportEvaluation,Long> {

    @Query("SELECT NEW com.example.asemsBack.Dto.CourseReportAverageDTO(" +
            "tc.id, tc.course.courseName, r.id, r.topicCovered, r.styleOfTeaching, r.submissionDate, AVG(e.score)) " +
            "FROM Report r " +
            "JOIN r.teacherCourse tc " +
            "JOIN tc.teacher t " +
            "JOIN r.reportEvaluations re " +
            "JOIN re.studReportEval sre " +
            "JOIN sre.evaluation e " +
            "WHERE t.id = :teacherId AND e.semester.id = :semesterId " +
            "GROUP BY tc.id, tc.course.courseName, r.id, r.topicCovered, r.styleOfTeaching, r.submissionDate")
    List<CourseReportAverageDTO> findAverageEvaluationScoresByTeacherIdAndSemesterId(
            @Param("teacherId") Long teacherId,
            @Param("semesterId") Long semesterId);
}