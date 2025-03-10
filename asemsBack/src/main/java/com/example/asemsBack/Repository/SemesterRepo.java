package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SemesterRepo extends JpaRepository<Semester,Long> {
    Semester findByIsActive(boolean b);
}