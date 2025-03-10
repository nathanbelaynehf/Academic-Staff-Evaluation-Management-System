package com.example.asemsBack.Repository;

import com.example.asemsBack.Control.AcademicDeanEvalDTO;
import com.example.asemsBack.Model.AcademicDeanEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdEvalRepo extends JpaRepository<AcademicDeanEval,Long> {
    @Query("SELECT NEW com.example.asemsBack.Control.AcademicDeanEvalDTO(" +
            "e.score, e.remark) " +
            "FROM AcademicDeanEval a " +
            "JOIN a.evaluation e " + // Explicitly join the Evaluation entity
            "WHERE a.teacher.id = :teacherId")
    List<AcademicDeanEvalDTO> findScoreAndRemarkByTeacherId(@Param("teacherId") Long teacherId);
    }
