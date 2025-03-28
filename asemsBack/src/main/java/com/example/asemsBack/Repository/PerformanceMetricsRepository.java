package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.PerformanceMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerformanceMetricsRepository extends JpaRepository<PerformanceMetrics,Long> {
}