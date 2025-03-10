package com.example.asemsBack.Repository;
import com.example.asemsBack.Model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends JpaRepository <Evaluation,Long>{
}
