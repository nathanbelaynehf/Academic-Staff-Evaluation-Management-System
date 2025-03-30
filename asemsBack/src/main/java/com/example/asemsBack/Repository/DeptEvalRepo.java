package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.DeptEvalDTO;
import com.example.asemsBack.Dto.DeptEvalResultDTO;
import com.example.asemsBack.Model.DeptEval;
import com.example.asemsBack.Model.Teacher;
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

    @Query("SELECT d.departmentHead.department.departmentName, d.deptCriteria.name, d.evaluation.score " +
            "FROM DeptEval d " +
            "WHERE d.teacher.user.username = :username " +
            "AND d.evaluation.semester.id = :semesterId " +
            "AND d.deptCriteria.round = :round")
    List<Object[]> findDepartmentEvaluationsForTeacherAndSemesterAndRound(
            @Param("username") String username,
            @Param("semesterId") long semesterId,
            @Param("round") int round
    );

    @Query("SELECT new com.example.asemsBack.Dto.DeptEvalDTO(de.id, de.deptCriteria.id, de.teacher.id, de.departmentHead.id) " +
            "FROM DeptEval de WHERE de.departmentHead.id = :departmentHeadId")
    List<DeptEvalDTO> findByDepartmentHeadId(@Param("departmentHeadId") Long departmentHeadId);

//    @Query("SELECT t.user.fullName, e.criteria, e.score " +
//            "FROM DeptEval e " +
//            "JOIN e.teacher t " +
//            "WHERE t.department.id = :departmentId")
//    List<Object[]> findByDepartmentId(@Param("departmentId") Long departmentId);



    @Query("SELECT new com.example.asemsBack.Dto.DeptEvalResultDTO(" +
            "c.id, c.name, e.score) " +
            "FROM DeptEval de " +
            "JOIN de.deptCriteria c " +
            "JOIN de.evaluation e " +
            "WHERE de.departmentHead.id = :departmentHeadId " +
            "AND de.teacher.id = :teacherId")
    List<DeptEvalResultDTO> findEvaluationsByHeadAndTeacher(
            @Param("departmentHeadId") Long departmentHeadId,
            @Param("teacherId") Long teacherId);


    List<DeptEval> findByTeacher(Teacher teacher);

    @Query(value = "SELECT de.department_head_id, SUM(e.score) " +
            "FROM dept_eval de " +
            "JOIN evaluation e ON de.eval_id = e.evalid " +
            "WHERE de.teacher_id = :teacherId " +
            "AND e.semester_id = :semesterId " +
            "GROUP BY de.department_head_id", nativeQuery = true)
    List<Object[]> findDeptHeadEvaluationSumsByTeacher(
            @Param("teacherId") Long teacherId,
            @Param("semesterId") Long semesterId);
}
