package com.example.asemsBack.Repository;

import com.example.asemsBack.Model.Registrar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrarRepo extends JpaRepository <Registrar,Long>{
}
