package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Enrollement;
import com.example.asemsBack.Model.EnrollementSemester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollmentSemesterRepo extends JpaRepository<EnrollementSemester,Long> {
    EnrollementSemester findByEnrollement(Enrollement enrollement);
}
