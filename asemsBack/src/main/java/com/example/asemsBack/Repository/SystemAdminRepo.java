package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.SystemAdmin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemAdminRepo extends JpaRepository<SystemAdmin,Long> {
}
