package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.AcademicDean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ADRepo extends JpaRepository<AcademicDean,Long> {

}
