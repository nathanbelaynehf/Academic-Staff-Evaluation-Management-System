package com.example.asemsBack.Service;

import com.example.asemsBack.Model.DatabaseHealth;
import com.example.asemsBack.Repository.DatabaseHealthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class DatabaseHealthService {

    @Autowired
    private DatabaseHealthRepository databaseHealthRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public DatabaseHealth getDatabaseHealth() {
        DatabaseHealth health = new DatabaseHealth();

        // Fetch active connections
        int activeConnections = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE status = 'running'", Integer.class);

        // Check if sys.dm_exec_query_stats is empty
        Long queryCount = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM sys.dm_exec_query_stats", Long.class);

        Double avgElapsedTime = 0.0;
        if (queryCount != null && queryCount > 0) {
            // Fetch average query execution time
            avgElapsedTime = jdbcTemplate.queryForObject(
                    "SELECT AVG(total_elapsed_time) FROM sys.dm_exec_query_stats", Double.class);
        }

        // Set the values
        health.setActiveConnections(activeConnections);
        health.setQueryPerformance(avgElapsedTime != null ? avgElapsedTime : 0.0); // Default to 0.0 if NULL
        health.setTimestamp(LocalDateTime.now());

        // Save to the database
        return databaseHealthRepository.save(health);
    }
}