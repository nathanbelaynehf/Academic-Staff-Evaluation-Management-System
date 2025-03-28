package com.example.asemsBack.Repository;

import com.example.asemsBack.Dto.RegistrarDto;
import com.example.asemsBack.Model.Registrar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrarRepo extends JpaRepository <Registrar,Long>{

    @Query("SELECT new com.example.asemsBack.Dto.RegistrarDto(r.id, r.user.fname, r.user.lname, r.user.username) " +
            "FROM Registrar r LEFT JOIN r.user")
    List<RegistrarDto> findAllWithUserDTO();

}
