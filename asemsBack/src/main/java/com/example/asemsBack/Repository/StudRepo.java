package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudRepo  extends JpaRepository<Student,Long> {
}
