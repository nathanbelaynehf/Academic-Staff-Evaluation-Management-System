package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.AcademicDeanDto;
import com.example.asemsBack.Model.AcademicDean;
import com.example.asemsBack.Model.AcademicDeanEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ADRepo extends JpaRepository<AcademicDean,Long> {
    @Query("SELECT ade FROM AcademicDeanEval ade WHERE ade.academicDean.id = :academicDeanId")
    List<AcademicDeanEval> findByAcademicDeanId(Long academicDeanId);

    @Query("SELECT new com.example.asemsBack.Dto.AcademicDeanDto(ad.id, ad.user.fname, ad.user.lname, ad.user.username) " +
            "FROM AcademicDean ad LEFT JOIN ad.user")
    List<AcademicDeanDto> findAllWithUserDTO();
}