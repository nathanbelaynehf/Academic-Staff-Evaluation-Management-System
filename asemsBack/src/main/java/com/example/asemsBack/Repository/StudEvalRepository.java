package com.example.asemsBack.Repository;
import com.example.asemsBack.Model.StudEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudEvalRepository extends JpaRepository<StudEval,Long> {


    @Query(value = "SELECT u.username AS teacher, tc.course_id AS courseId, c.name AS criteria, co.course_name AS courseName, CAST(AVG(CAST(e.score AS FLOAT)) AS FLOAT) AS avgScore " +
            "FROM stud_eval s " +
            "JOIN evaluation e ON s.eval_id = e.evalid " +
            "JOIN criteria c ON s.criteria_id = c.id " +
            "JOIN teacher_course tc ON s.teacher_course_id = tc.id " +
            "JOIN teacher t ON tc.teacher_id = t.id " +
            "JOIN users u ON t.user_id = u.id " +
            "JOIN course co ON tc.course_id = co.id " +
            "WHERE e.semester_id = :semesterId " + // Filter by semester
            "AND c.round = :round " + // Filter by round
            "GROUP BY u.username, tc.course_id, c.name, co.course_name", nativeQuery = true)
    List<Object[]> findEvaluationResultsForAllInstructorsAndSemesterAndRound(
            @Param("semesterId") Long semesterId, // Add semesterId parameter
            @Param("round") int round // Add round parameter
    );


    @Query(value = "SELECT u.username AS teacher, tc.course_id AS courseId, c.name AS criteria, co.course_name AS courseName, CAST(AVG(CAST(e.score AS FLOAT)) AS FLOAT) AS avgScore " +
            "FROM stud_eval s " +
            "JOIN evaluation e ON s.eval_id = e.evalid " +
            "JOIN criteria c ON s.criteria_id = c.id " +
            "JOIN teacher_course tc ON s.teacher_course_id = tc.id " +
            "JOIN teacher t ON tc.teacher_id = t.id " +
            "JOIN users u ON t.user_id = u.id " +
            "JOIN course co ON tc.course_id = co.id " +
            "JOIN department_course dc ON co.id = dc.course_id " +
            "WHERE t.id IN :teacherIds " +
            "AND dc.department_id = :departmentId " +
            "AND e.semester_id = :semesterId " + // Filter by semester
            "AND c.round = :round " + // Filter by round
            "GROUP BY u.username, tc.course_id, c.name, co.course_name", nativeQuery = true)
    List<Object[]> findEvaluationResultsByTeacherIdsAndDepartmentAndSemesterAndRound(
            @Param("teacherIds") List<Long> teacherIds,
            @Param("departmentId") Long departmentId,
            @Param("semesterId") Long semesterId, // Add semesterId parameter
            @Param("round") int round // Add round parameter
    );


}
