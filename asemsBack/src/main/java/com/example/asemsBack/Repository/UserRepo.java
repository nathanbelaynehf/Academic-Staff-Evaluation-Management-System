package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository
public interface UserRepo extends JpaRepository<Users,Long> {
    Users findByUsername(String name);
    boolean existsByUsername(String username);
    boolean existsByUsernameIgnoreCase(String username);
}
