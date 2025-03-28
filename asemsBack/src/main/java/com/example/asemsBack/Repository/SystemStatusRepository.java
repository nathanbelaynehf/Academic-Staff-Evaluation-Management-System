package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.SystemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemStatusRepository extends JpaRepository<SystemStatus,Long> {
}
