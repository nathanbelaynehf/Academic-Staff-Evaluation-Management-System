package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.DatabaseHealth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseHealthRepository extends JpaRepository<DatabaseHealth,Long> {
}
