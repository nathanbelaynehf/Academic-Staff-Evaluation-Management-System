package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Criteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CriteriaRepo extends JpaRepository<Criteria, Long> {

    @Query(value = "SELECT * FROM criteria WHERE id = :id", nativeQuery = true)
    Criteria findCriteriaById(@Param("id") Long id);

    List<Criteria> findByTypeAndRound(String student, int activeRound);
}