package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.DeptEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeptEvalRepo extends JpaRepository<DeptEval,Long> {

    @Query(value = "SELECT d.department_name AS department, c.name AS criteria, AVG(e.score) AS avgScore " +
            "FROM dept_eval de " +
            "JOIN evaluation e ON de.eval_id = e.evalid " +
            "JOIN criteria c ON de.criteria_id = c.id " +
            "JOIN department_head dh ON de.department_head_id = dh.id " +
            "JOIN department d ON dh.department_id = d.id " +
            "WHERE de.teacher_id = :teacherId " +
            "AND e.semester_id = :semesterId " + // Filter by semester
            "AND c.round = :round " + // Filter by round
            "GROUP BY d.department_name, c.name", nativeQuery = true)
    List<Object[]> findDepartmentHeadEvaluationsByTeacherIdAndSemesterAndRound(
            @Param("teacherId") Long teacherId,
            @Param("semesterId") Long semesterId,
            @Param("round") int round);
}
