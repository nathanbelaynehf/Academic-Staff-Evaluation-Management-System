package com.example.asemsBack.Repository;

import com.example.asemsBack.Control.AcademicDeanControls.AdEval;
import com.example.asemsBack.Dto.AcademicDeanEvalDTO;
import com.example.asemsBack.Model.AcademicDeanEval;
import com.example.asemsBack.Model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdEvalRepo extends JpaRepository<AcademicDeanEval,Long> {
    @Query("SELECT NEW com.example.asemsBack.Dto.AcademicDeanEvalDTO(" +
            "e.score, e.remark) " +
            "FROM AcademicDeanEval a " +
            "JOIN a.evaluation e " + // Explicitly join the Evaluation entity
            "WHERE a.teacher.id = :teacherId")
    List<AcademicDeanEvalDTO> findScoreAndRemarkByTeacherId(@Param("teacherId") Long teacherId);

    @Query("SELECT NEW com.example.asemsBack.Dto.AcademicDeanEvalDTO(e.score, e.remark) " +
            "FROM AcademicDeanEval ad " +
            "JOIN ad.evaluation e " +
            "WHERE ad.teacher.user.username = :username " +
            "AND e.semester.id = :semesterId " +
            "AND ad.round = :round")
    AcademicDeanEvalDTO findEvaluationDto(
            @Param("username") String username,
            @Param("semesterId") long semesterId,
            @Param("round") int round
    );

    List<AcademicDeanEval> findByAcademicDeanId(Long academicDeanId);

    List<AcademicDeanEval> findByTeacher(Teacher teacher);

}
