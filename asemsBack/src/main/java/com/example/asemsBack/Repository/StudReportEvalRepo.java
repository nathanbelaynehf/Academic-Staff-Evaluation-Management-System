package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.StudReportEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudReportEvalRepo extends JpaRepository<StudReportEval,Long> {
    List<StudReportEval> findByStudentId(Long studentId);

//    Optional<StudReportEval> findByStudentIdAndReportId(Long studentId, long id);
}
