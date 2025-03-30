package com.example.asemsBack.Repository;
import com.example.asemsBack.Dto.StudEvalDTO;
import com.example.asemsBack.Model.StudEval;
import com.example.asemsBack.Model.StudReportEval;
import com.example.asemsBack.Model.TeacherCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

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


    @Query(value = "SELECT u.username AS teacher, u.fname AS fname, u.lname AS lname, tc.course_id AS courseId, c.name AS criteria, co.course_name AS courseName, CAST(AVG(CAST(e.score AS FLOAT)) AS FLOAT) AS avgScore " +
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
            "GROUP BY u.username, u.fname, u.lname, tc.course_id, c.name, co.course_name", nativeQuery = true)
    List<Object[]> findEvaluationResultsByTeacherIdsAndDepartmentAndSemesterAndRound(
            @Param("teacherIds") List<Long> teacherIds,
            @Param("departmentId") Long departmentId,
            @Param("semesterId") Long semesterId, // Add semesterId parameter
            @Param("round") int round // Add round parameter
    );


    @Query("SELECT t.user.username, tc.course.courseName, c.name, AVG(e.score) " +
            "FROM StudEval se " +
            "JOIN se.teacherCourse tc " +
            "JOIN tc.teacher t " +
            "JOIN se.studCriteria c " +
            "JOIN se.evaluation e " +
            "WHERE t.user.username = :username " +
            "AND e.semester.id = :semesterId " +
            "AND c.round = :round " +
            "GROUP BY t.user.username, tc.course.courseName, c.name")
    List<Object[]> findEvaluationResultsForTeacherAndSemesterAndRound(
            @Param("username") String username,
            @Param("semesterId") Long semesterId,
            @Param("round") int round
    );

    @Query("SELECT new com.example.asemsBack.Dto.StudEvalDTO(se.id, se.studCriteria.id, se.student.id, se.teacherCourse.id) " +
            "FROM StudEval se WHERE se.student.id = :studentId")
    List<StudEvalDTO> findByStudentId(@Param("studentId") Long studentId);

    @Query(value = "SELECT u.username, u.fname, u.lname " +
            "FROM teacher t " +
            "JOIN users u ON t.user_id = u.id " +
            "WHERE t.id IN :teacherIds", nativeQuery = true)
    List<Object[]> findTeacherNamesByTeacherIds(@Param("teacherIds") List<Long> teacherIds);





    @Query(value = "SELECT s.student_id, SUM(e.score) " +
            "FROM stud_eval s " +
            "JOIN evaluation e ON s.eval_id = e.evalid " +
            "JOIN teacher_course tc ON s.teacher_course_id = tc.id " +
            "WHERE tc.teacher_id = :teacherId " +
            "AND e.semester_id = :semesterId " +
            "AND (SELECT c.round FROM criteria c WHERE c.id = s.criteria_id) = :round " +
            "GROUP BY s.student_id", nativeQuery = true)
    List<Object[]> findStudentEvaluationSumsByTeacher(
            @Param("teacherId") Long teacherId,
            @Param("semesterId") Long semesterId,
            @Param("round") int round);

    @Query("SELECT COUNT(DISTINCT se.student) FROM StudEval se WHERE se.student.classes.id = :classId")
    Long countByStudent_Classes_Id(@Param("classId") Long classId);

    @Query("SELECT COUNT(DISTINCT se.student.id) FROM StudEval se WHERE se.student.id IN :studentIds")
    long countDistinctByStudentIdIn(@Param("studentIds") List<Long> studentIds);

    @Query("SELECT DISTINCT se.teacherCourse.id FROM StudEval se " +
            "WHERE se.student.id = :studentId AND se.teacherCourse IN :teacherCourses")
    List<Long> findEvaluatedTeacherCourseIds(@Param("studentId") Long studentId,
                                             @Param("teacherCourses") List<TeacherCourse> teacherCourses);
    @Query("SELECT se FROM StudEval se " +
            "JOIN FETCH se.evaluation e " +
            "WHERE se.student.id = :studentId")
    List<StudEval> findByStudentIds(@Param("studentId") Long studentId);

    public interface EvaluationSumDTO {
        Long getTeacherCourseId();
        BigDecimal getSummedScore();
    }

    @Query("""
    SELECT 
        se.teacherCourse.id as teacherCourseId, 
        SUM(e.score) as summedScore 
    FROM StudEval se 
    JOIN se.evaluation e 
    WHERE se.student.id = :studentId 
    GROUP BY se.teacherCourse.id
    """)
    List<EvaluationSumDTO> sumScoresByCourse(@Param("studentId") Long studentId);
}


